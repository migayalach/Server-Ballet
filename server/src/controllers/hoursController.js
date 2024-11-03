const pool = require("../dataBase/conexion");
const { allHours, existIdHours } = require("./controllerData");
const { responseData } = require("../utils/response");
const { isNumber, isString, dateComplete } = require("../helpers/funcAux");

const createHours = async (startTime, endTime, totalTime) => {
  if (dateComplete(startTime, endTime, totalTime)) {
    const [ResultSetHeader] = await pool.query(
      `INSERT INTO hours (startTime, endTime, totalTime) VALUES(?,?,?)`,
      [startTime, endTime, totalTime]
    );
    const hoursData = await getIdHours(ResultSetHeader.insertId);
    const infoData = await getAllHours();
    return { hoursData, infoData, state: "create-hour" };
  }
};

const getAllHours = async () => {
  const page = 1;
  const response = await allHours();
  return responseData(response, "hours", page);
};

const getPageHours = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allHours();
  return responseData(response, "hours", page);
};

const getIdHours = async (idHours) => {
  if (isNumber(idHours)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const [data] = await pool.query(`SELECT * FROM hours WHERE idHours= ?`, [
    idHours,
  ]);
  if (!data.length) {
    throw Error(`La hora que usted busca no se encuentra en los registros`);
  }
  return data[0];
};

const updateHours = async (
  idHours,
  startTime,
  endTime,
  totalTime,
  stateHours
) => {
  if (isNumber(idHours)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (isString(stateHours)) {
    throw Error(`Solo se permiten estados activo o desactivado`);
  }
  if (dateComplete(startTime, endTime, totalTime)) {
    if (!existIdHours(idHours)) {
      throw Error(`No se encuentro la hora seleccionada`);
    }
    await pool.query(
      `UPDATE hours SET startTime = ?, endTime = ?, totalTime = ?, stateHours = ? WHERE idHours = ?`,
      [startTime, endTime, totalTime, stateHours, idHours]
    );
    return await getIdHours(idHours);
  }
};

const removeHours = async (idHours) => {
  if (isNaN(idHours)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!(await existIdHours(+idHours))) {
    throw Error(`El nivel que usted quiere eliminar no existe`);
  }

  const [data] = await pool.query(
    `SELECT * FROM hours h, class c WHERE h.idHours = c.idHours AND c.idHours = ${idHours}`
  );

  if (data.length) {
    throw Error(
      `Esta hora no puede ser eliminada ya que se encuentra vinculada a una clase.`
    );
  }

  await pool.query(`DELETE FROM hours WHERE idHours = ?`, [idHours]);
  const infoData = await getAllHours();
  return { infoData, state: "delete-hour" };
};

module.exports = {
  createHours,
  getAllHours,
  getPageHours,
  getIdHours,
  updateHours,
  removeHours,
};
