const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const { createQualification } = require("./qualificationController");
const { getIdClassStudent } = require("./classStudentController");

const { allParams } = require("./controllerData");

const createParams = async (idClass, dateTest, title, params) => {
  const jsonParmas = JSON.stringify(params);
  await pool.query(
    "INSERT INTO params (idClass, dateTest, title, params) VALUES (?, ?, ?, ?)",
    [idClass, dateTest, title, jsonParmas]
  );
  // LISTA DE ESTUDIANTES DE LA CLASE
  // const results = (await getIdClassStudent(idClass)).results.map(
  //   ({ idUser }) => idUser
  // );
  // await createQualification(
  //   idClass,
  //   (idUser = results),
  //   (qualification = params)
  // );
  return await getAllParams();
};

const getAllParams = async () => {
  const page = 1;
  const response = await allParams();
  return responseData(response, "params", page);
};

const getPageParams = async (page) => {
  const response = await allParams();
  return responseData(response, "params", page);
};

const getIdParams = async (idParams) => {
  const [data] = await pool.query(`SELECT * FROM params WHERE idParams = ?`, [
    idParams,
  ]);
  if (!data.length) {
    throw Error(`El examen que usted busca no se encuentra registrado`);
  }
  return data[0];
};

const updateParams = async (idParams, idClass, dateTest, title, params) => {
  const jsonParams = JSON.stringify(params);
  await pool.query(
    `UPDATE params SET dateTest = ?, title = ?, params = ? WHERE idParams = ?`,
    [dateTest, title, jsonParams, idParams]
  );
  return await getIdParams(idParams);
};

const removeParams = async (idParams) => {
  if (isNaN(idParams)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!(await getIdParams(idParams))) {
    throw Error(`El nivel que usted quiere eliminar no existe`);
  }
  await pool.query(`DELETE FROM params WHERE idParams = ?`, [idParams]);
  const infoData = await getAllParams();
  return { infoData, state: "delete" };
};

module.exports = {
  createParams,
  getAllParams,
  getPageParams,
  getIdParams,
  updateParams,
  removeParams,
};
