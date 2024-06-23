const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const { createQualification } = require("./qualificationController");
const { getIdClassStudent } = require("./classStudentController");
const { getIdUser } = require("../controllers/userController");
const { paramsList, promisseResolve } = require("./controllerData");

const { allParams } = require("./controllerData");

const studentsList = async (idClass) =>
  (await getIdClassStudent(idClass)).results.map(({ idUser }) => idUser);

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
  return responseData(response, "params", page);
};

const getIdParams = async (idUser) => {
  return await getAllParams(idUser);
};

// const getPageParams = async (page) => {
//   const response = await allParams();
//   return responseData(response, "params", page);
// };

const updateParams = async (
  idParams,
  idUser,
  idClass,
  dateTest,
  title,
  params
) => {
  // const jsonParams = JSON.stringify(params);
  // await pool.query(
  //   `UPDATE params SET dateTest = ?, title = ?, params = ? WHERE idParams = ?`,
  //   [dateTest, title, jsonParams, idParams]
  // );
  // return await getIdParams(idParams);
  

  return "editarlo";
};

// const removeParams = async (idParams) => {
//   if (isNaN(idParams)) {
//     throw Error(`El parametro debe ser un numero`);
//   }
//   if (!(await getIdParams(idParams))) {
//     throw Error(`El nivel que usted quiere eliminar no existe`);
//   }
//   await pool.query(`DELETE FROM params WHERE idParams = ?`, [idParams]);
//   const infoData = await getAllParams();
//   return { infoData, state: "delete" };
// };

module.exports = {
  createParams,
  getIdParams,
  // getAllParams,
  // getPageParams,
  updateParams,
  // removeParams,
};
