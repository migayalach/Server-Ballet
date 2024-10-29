const pool = require("../dataBase/conexion");
const { existUser, existClass } = require("./controllerData");
const responseData = require("../utils/response");
const { isNumber } = require("../helpers/funcAux");

const allClassStudent = async (idClass) => {
  const [data] = await pool.query(
    "SELECT c.idClass, l.nameLevel, e.department, u.* FROM class c, student s, user u, level l, extension e WHERE c.idClass = ? AND c.idClass = s.idClass AND u.idUser = s.idUser AND l.idLevel = u.idLevel AND e.idExtension = u.idExtension",
    [idClass]
  );
  return data;
};

// TODO MOSTRAR ALUMNOS POR CLASE
const getIdClassStudent = async (idClass) => {
  await existClass(idClass);
  if (isNumber(idClass)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const data = await allClassStudent(idClass);
  return responseData(data, "classStudent", 1, idClass);
};

// TODO PAGINADO DE LOS ESTUDIANTES
const getPageClassStudent = async (idClass, page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allClassStudent(idClass);
  return responseData(response, "classStudent", page, idClass);
};

// TODO CREAR NUEVO ALUMNO A UNA CLASE
const createClassStudent = async (idClass, idUser) => {
  await existClass(idClass);
  await existUser(idUser);
  const [data] = await pool.query(
    "SELECT idClass, idUser FROM student WHERE idUser = ? AND idClass = ? ",
    [idUser, idClass]
  );
  if (data.length) {
    throw Error(`Este alumno ya esta registrado en esta clase`);
  }
  await pool.query("INSERT INTO student (idClass, idUser) VALUES (?, ?)", [
    idClass,
    idUser,
  ]);
  return await getIdClassStudent(idClass);
};

// TODO ELIMINAR ALUMNO DE LA CLASE
const removeClassStudent = async (idClass, idUser) => {
  if (isNumber(idClass) && isNumber(idUser)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await pool.query("DELETE FROM student WHERE idClass = ? AND idUser = ?", [
    idClass,
    idUser,
  ]);
  return await getIdClassStudent(idClass);
};

module.exports = {
  getPageClassStudent,
  createClassStudent,
  getIdClassStudent,
  removeClassStudent,
  allClassStudent,
};
