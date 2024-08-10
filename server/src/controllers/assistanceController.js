const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const {
  existClass,
  existDate,
  existAssistance,
  deleteRegAttendance,
} = require("./controllerData");

// const listAllClass = async (idClass) => {
//   const [data] = await pool.query(
//     `SELECT s.idUser, u.nameUser, u.lastNameUser, u.carnetUser
//   FROM class c, student s, user u
//   WHERE c.idClass = s.idClass AND s.idUser = u.idUser AND c.idClass = ?`,
//     [idClass]
//   );
//   return data;
// };

// const setAssitance = async (idClass, dateAssistance, list) => {
//   await existClass(idClass);
//   await deleteAssistance(dateAssistance);
//   // PROMISE ALL
//   await Promise.all(
//     list.map(async ({ idUser, assitance }) => {
//       return await pool.query(
//         `INSERT INTO attendance (idUser, idClass, dateAssistance, assistance) VALUES (?, ?, ?, ?)`,
//         [idUser, idClass, dateAssistance, assitance]
//       );
//     })
//   );

//   return "Registro completo.";
// };

// const getIdListAssistance = async (
//   idClass,
//   startDate,
//   endDate,
//   idUser,
//   carnetUser
// ) => {
//   let query =
//     "SELECT s.idUser, u.nameUser, u.lastNameUser, u.carnetUser, a.dateAssistance, a.assistance FROM class c, student s, user u, attendance a WHERE c.idClass = s.idClass AND s.idUser = u.idUser AND a.idUser = u.idUser AND c.idClass = ? AND a.dateAssistance BETWEEN ? AND ?";
//   if (idUser) {
//     const [data] = await pool.query(`${query}  AND a.idUser = ?`, [
//       idClass,
//       startDate,
//       endDate,
//       idUser,
//     ]);
//     if (!data.length) {
//       throw Error(`El alumno no existe`);
//     }
//     return data;
//   } else if (carnetUser) {
//     const [data] = await pool.query(`${query}  AND u.carnetUser = ?`, [
//       idClass,
//       startDate,
//       endDate,
//       carnetUser,
//     ]);
//     if (!data.length) {
//       throw Error(`El alumno no existe`);
//     }
//     return data;
//   } else {
//     const [data] = await pool.query(query, [idClass, startDate, endDate]);
//     return data;
//   }

//   // const [data] = await pool.query(
//   //   `SELECT s.idUser, u.nameUser, u.lastNameUser, u.carnetUser, a.dateAssistance, a.assistance FROM class c, student s, user u, attendance a WHERE c.idClass = s.idClass AND s.idUser = u.idUser AND a.idUser = u.idUser AND c.idClass = ? AND a.dateAssistance BETWEEN ? AND ?`,
//   //   [idClass, startDate, endDate]
//   // );
//   return data;
// };

// const listAllClassAssistance = async () => {
//   const [data] = await pool.query(
//     `SELECT c.idClass, u.idUser, u.nameUser, u.lastNameUser, u.carnetUser, c.parallel, c.stateClass FROM class c, user u WHERE c.idUser = u.idUser ORDER BY c.idClass ASC`
//   );
//   return data;
// };

const getAllIdClassLiss = async (idClass) => {
  const [data] = await pool.query(
    `SELECT a.idAssistance, a.idClass, a.dateAssistance FROM assistance a WHERE a.idClass = ? ORDER BY a.dateAssistance ASC`,
    [idClass]
  );
  return responseData(data, "assistance", (page = 1), idClass);
};

const getPageAssistance = async (idClass, page) => {
  const [data] = await pool.query(
    `SELECT a.idAssistance, a.idClass, a.dateAssistance FROM assistance a WHERE a.idClass = ? ORDER BY a.dateAssistance ASC`,
    [idClass]
  );
  return responseData(data, "assistance", page, idClass);
};

const createNewAssistance = async (idClass, dateAssistance) => {
  await existClass(idClass);

  const [listStudents] = await pool.query(
    `SELECT idUser, stateStudent FROM student WHERE idClass = ?`,
    [idClass]
  );

  if (!listStudents.length) {
    throw Error(
      `Esta clase no puede generar un registro ya que no cuenta con alumnado`
    );
  }

  if (await existDate(idClass, dateAssistance));

  const [newAssistance] = await pool.query(
    `INSERT INTO assistance (idClass, dateAssistance) VALUES (?, ?)`,
    [idClass, dateAssistance]
  );

  await Promise.all(
    listStudents.map(async ({ idUser }) => {
      return await pool.query(
        `INSERT INTO attendance (idUser, idAssistance) VALUES (?, ?)`,
        [idUser, newAssistance.insertId]
      );
    })
  );

  const [newClass] = await pool.query(
    `SELECT a.idAssistance, a.idClass, a.dateAssistance FROM assistance a WHERE a.idAssistance = ? `,
    [newAssistance.insertId]
  );

  const assistanceData = newClass[0];
  const infoData = await getAllIdClassLiss(idClass);
  return { assistanceData, infoData, state: "create" };
};

const updateDateAssistance = async (idAssistance, idClass, dateAssistance) => {
  await existClass(idClass);
  if (await existDate(idClass, dateAssistance));

  if (
    (
      await pool.query(
        `SELECT assistance FROM attendance WHERE idAssistance = ?`,
        [idAssistance]
      )
    ).includes(true)
  ) {
    throw Error(
      `Lo siento no se puede modificar la fecha ya que actualmente ya se registro la asistencia`
    );
  }

  await pool.query(
    `UPDATE assistance SET dateAssistance = ? WHERE idAssistance = ?`,
    [dateAssistance, idAssistance]
  );

  return await getAllIdClassLiss(idClass);
};

const removeAssistance = async (idAssistance, idClass) => {
  await existClass(idClass);
  await existAssistance(idAssistance);
  if (
    (
      await pool.query(
        `SELECT assistance FROM attendance WHERE idAssistance = ?`,
        [idAssistance]
      )
    ).includes(true)
  ) {
    throw Error(
      `Lo siento no se puede modificar la fecha ya que actualmente ya se registro la asistencia`
    );
  }

  await deleteRegAttendance(idAssistance);

  await pool.query(`DELETE FROM assistance WHERE idAssistance = ?`, [
    idAssistance,
  ]);

  const infoData = await getAllIdClassLiss(idClass);
  return { infoData, state: "delete" };
};

module.exports = {
  createNewAssistance,
  getAllIdClassLiss,
  getPageAssistance,
  updateDateAssistance,
  removeAssistance,
};
