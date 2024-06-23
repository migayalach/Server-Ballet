const responseData = require("../utils/response");
const pool = require("../dataBase/conexion");
const { getIdUser } = require("./userController");

const noteQualification = (qualification) => {
  let sum = 0;
  const note = qualification.map(({ calification }) => calification);
  for (let i = 0; i < note.length; i++) {
    sum += note[i];
  }
  return sum;
};

const createQualification = async (idParams, idUser, arrayData) => {
  const noteFinish = arrayData.map(({ idUser, qualification }) => ({
    idUser,
    qualification,
    note: noteQualification(qualification),
  }));

  // BORRAR REGISTROS ANTERIORES
  await deleteQualification(idParams);

  // INSERTAR A LA BASE DE DATOS
  await Promise.all(
    noteFinish.map(async ({ idUser, qualification, note }) => {
      return await pool.query(
        `INSERT INTO qualification (idParams, idUser, qualification, note) VALUES (?, ?, ?, ?)`,
        [idParams, idUser, JSON.stringify(qualification), note]
      );
    })
  );

  // MOSTRAR NUEVO REGISTRO CON LAS NOTAS
  return await getAllQualification(idParams, idUser);
};

const deleteQualification = async (idParams) => {
  await pool.query(`DELETE FROM qualification WHERE idParams = ${idParams}`);
};

const getAllQualification = async (idParams, idUser) => {
  const { nameLevel } = await getIdUser(idUser);
  if (nameLevel === "Estudiante") {
    throw Error(`No cuenta con los permisos necesarios`);
  }

  // TRAER LISTA CON TODOS LOS ESTUDIANTES A CALIFICAR
  const [data] = await pool.query(
    `SELECT * FROM qualification WHERE idParams = ${idParams}`
  );

  return data.map(({ idParams, idUser, qualification, note }) => ({
    idParams,
    idUser,
    qualification: JSON.parse(qualification),
    note,
  }));
};

// const getIdQualificationAll = async (idParams, idUser) => {
//   const { nameLevel } = await getIdUser(idUser);
//   if (nameLevel === "Estudiante") {
//     throw Error(`No cuenta con los permisos necesarios`);
//   }

//   // TRAER LISTA CON TODOS LOS ESTUDIANTES A CALIFICAR
//   const [data] = await pool.query(
//     `SELECT * FROM qualification WHERE idParams = ${idParams}`
//   );

//   return data.map(({ idParams, idUser, qualification, note }) => ({
//     idParams,
//     idUser,
//     qualification: JSON.parse(qualification),
//     note,
//   }));

//   // const page = 1;
//   // const { nameLevel } = await getIdUser(idUser);
//   // if (nameLevel === "Estudiante" || nameLevel === "Secretaria") {
//   //   throw Error(`Lo siento usted no tiene permiso para acceder`);
//   // }
//   // let query =
//   //   "SELECT p.idParams, p.idClass, c.parallel, u.nameUser, u.lastNameUser, p.dateTest, p.title FROM params p, class c, user u WHERE p.idClass = c.idClass AND u.idUser = c.idUser ";
//   // if (nameLevel === "Director") {
//   //   const [data] = await pool.query(query);
//   //   if (!data.length) {
//   //     throw Error`No se encontraron clases`;
//   //   }
//   //   return responseData(data, "qualificationList", page);
//   // } else if (nameLevel === "Profesor") {
//   //   query += `AND c.idUser = ${idUser}`;
//   //   const [data] = await pool.query(query);
//   //   if (!data.length) {
//   //     throw Error`No se encontraron clases`;
//   //   }
//   //   return responseData(data, "qualificationList", page);
//   // }
// };

module.exports = {
  getAllQualification,
  createQualification,
  // getIdQualificationAll,
};
