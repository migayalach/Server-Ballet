const pool = require("../dataBase/conexion");
const { responseData } = require("../utils/response");
const { deleteQualification } = require("./qualificationController");
const { allClassStudent } = require("./classStudentController");
const { paramsList, promisseResolve } = require("./controllerData");

const { allParams } = require("./controllerData");

const studentsList = async (idClass) =>
  (await allClassStudent(idClass)).map(({ idUser }) => idUser);

const addParamsStudents = async (idClass, dateTest, title, params) => {
  const jsonParmas = JSON.stringify(params);
  const [ResultSetHeader] = await pool.query(
    "INSERT INTO params (idClass, dateTest, title, params) VALUES (?, ?, ?, ?)",
    [idClass, dateTest, title, jsonParmas]
  );

  //!idParams
  return ResultSetHeader.insertId;
};

const createParams = async (idClass, dateTest, title, params) => {
  const [existTitle] = await pool.query(
    `SELECT title FROM params WHERE title = ? AND idClass = ?`,
    [title, idClass]
  );

  if (existTitle.length) {
    throw Error(
      `Este titulo ya esta registrado como evaluacion para este curso`
    );
  }

  //!idParams
  const paramsUltimate = await addParamsStudents(
    idClass,
    dateTest,
    title,
    params
  );

  // LISTA DE ALUMNOS = (idUser)
  const listStudent = await studentsList(idClass);

  // LISTA DE PARAMETROS
  const listParams = paramsList(params, "create");

  // PROMISE ALL
  await promisseResolve(listStudent, paramsUltimate, listParams);
  // DEVOLVER LA LISTA DE PARAMS DE LA CLASE
  return await getIdParams(idClass);
};

const getAllParams = async (idClass) => {
  const page = 1;
  const response = await allParams(idClass);
  return responseData(response, "params", page, idClass);
};

const getIdParams = async (idClass) => {
  return await getAllParams(idClass);
};

const getPageParams = async (idClass, page) => {
  const response = await allParams(idClass);
  return responseData(response, "params", page, idClass);
};

const updateParams = async (idParams, idClass, dateTest, title, params) => {
  const [dataParams] = await pool.query(
    `SELECT noteFinish FROM params WHERE idParams = ?`,
    [idParams]
  );

  if (!dataParams[0].noteFinish < 1) {
    throw Error(
      `Lo siento no puede realizar esta accion porque ya se cuenta con un promedio`
    );
  }

  await deleteQualification(idParams);

  // *MODIFICACION DE TITULO Y FECHA
  await pool.query(
    `UPDATE params SET dateTest = ?, title = ? WHERE idParams = ?`,
    [dateTest, title, idParams]
  );

  await pool.query(
    `UPDATE params SET idClass = ?, params = ? WHERE idParams = ?`,
    [idClass, JSON.stringify(params), idParams]
  );

  // LISTA DE ALUMNOS = (idUser)
  const listStudent = await studentsList(idClass);

  // LISTA DE PARAMETROS
  const listParams = paramsList(params, "create");

  // PROMISE ALL
  await promisseResolve(listStudent, idParams, listParams);

  // return await getAllClass(idUser);
  return await getAllParams(idClass);
};

const removeParams = async (idClass, idParams) => {
  const [existClass] = await pool.query(
    `SELECT * FROM class WHERE idClass = ?`,
    [idClass]
  );

  if (!existClass.length) {
    throw Error(`La clase no existe`);
  }

  const [data] = await pool.query(`SELECT * FROM params WHERE idParams = ? `, [
    idParams,
  ]);

  if (!data.length) {
    throw Error(`Esta evaluacion no existe`);
  }

  const [dataParams] = await pool.query(
    `SELECT noteFinish FROM params WHERE idParams = ?`,
    [idParams]
  );

  if (!dataParams[0].noteFinish < 1) {
    throw Error(
      `Lo siento no puede realizar esta accion porque ya se cuenta con un promedio`
    );
  }

  await deleteQualification(idParams);

  const [resData] = await pool.query(`DELETE FROM params WHERE idParams = ?`, [
    idParams,
  ]);

  if (resData.affectedRows > 0) {
    return await getAllParams(idClass);
  }

  throw Error(`No se pudo realizar esta operacion!`);
};

const getIdParamsInfo = async (idParams) => {
  const [data] = await pool.query(
    `SELECT * FROM params p WHERE p.idParams = ?`,
    [idParams]
  );

  if (!data.length) {
    throw Error(`Esta evaluacion no existe`);
  }

  return {
    idParams: data[0].idParams,
    idClass: data[0].idClass,
    dateTest: data[0].dateTest,
    title: data[0].title,
    params: JSON.parse(data[0].params),
    noteFinish: data[0].noteFinish,
  };
};

module.exports = {
  createParams,
  getIdParams,
  getPageParams,
  updateParams,
  removeParams,
  getIdParamsInfo,
};
