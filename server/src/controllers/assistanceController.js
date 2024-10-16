const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const {
  existClass,
  existDate,
  existAssistance,
  deleteRegAttendance,
} = require("./controllerData");

const getAllIdClassLiss = async (idClass) => {
  const [data] = await pool.query(
    `SELECT a.idAssistance, a.idClass, a.dateAssistance FROM assistance a WHERE a.idClass = ? ORDER BY a.dateAssistance ASC`,
    [idClass]
  );
  return responseData(data, "assistance", (page = 1), idClass);
};

const getIdAssisntance = async (idClass, idAssistance) => {
  const [data] = await pool.query(
    `SELECT idAssistance, dateAssistance FROM assistance WHERE idClass = ? AND idAssistance = ?`,
    [idClass, idAssistance]
  );
  if (!data.length) {
    throw Error(`El registro de asistencia que usted busca no existe`);
  }
  return data[0];
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
  getIdAssisntance,
  updateDateAssistance,
  removeAssistance,
};
