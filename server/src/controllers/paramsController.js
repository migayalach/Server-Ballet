const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const { deleteQualification } = require("./qualificationController");
const {
  getIdClassStudent,
  allClassStudent,
} = require("./classStudentController");
const { getAllClass } = require("../controllers/classController");
const { paramsList, promisseResolve } = require("./controllerData");

const { allParams } = require("./controllerData");

const studentsList = async (idClass) =>
  (await allClassStudent(idClass)).map(({ idUser }) => idUser);

// (await allClassStudent(idClass)).results.map(({ idUser }) => idUser);
// (await getIdClassStudent(idClass)).results.map(({ idUser }) => idUser);

const addParamsStudents = async (idClass, dateTest, title, params) => {
  const jsonParmas = JSON.stringify(params);
  const [ResultSetHeader] = await pool.query(
    "INSERT INTO params (idClass, dateTest, title, params) VALUES (?, ?, ?, ?)",
    [idClass, dateTest, title, jsonParmas]
  );

  //!idParams
  return ResultSetHeader.insertId;
};

const createParams = async (idUser, idClass, dateTest, title, params) => {
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
  return await getAllParams(idUser);
};

const getAllParams = async (idUser) => {
  const page = 1;
  const response = await allParams(idUser);
  return responseData(response, "params", page, idUser);
};

const getIdParams = async (idUser) => {
  return await getAllParams(idUser);
};

const getPageParams = async (idUser, page) => {
  const response = await allParams(idUser);
  return responseData(response, "params", page, idUser);
};

const updateParams = async (
  idParams,
  idUser,
  idClass,
  dateTest,
  title,
  params
) => {
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

  const results = (await getAllClass(idUser)).results.map(
    ({ idClass }) => idClass
  );

  if (!results.includes(+idClass)) {
    throw Error(`Lo siento esta clase no corresponde a este usuario`);
  }

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
  return await getAllParams(idUser);
};

const removeParams = async (idUser, idParams) => {
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
  await pool.query(`DELETE FROM params WHERE idParams = ?`, [idParams]);
  return await getAllParams(idUser);
};

module.exports = {
  createParams,
  getIdParams,
  getPageParams,
  updateParams,
  removeParams,
};
