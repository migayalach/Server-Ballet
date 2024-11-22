const pool = require("../dataBase/conexion");
const {
  existUser,
  existClass,
  allClassStudentOff,
  allClassStudent,
} = require("./controllerData");
const { responseData } = require("../utils/response");
const { getIdUser } = require("./userController");
const { isNumber } = require("../helpers/funcAux");

const getIdClassIdStudent = async (idClass, idUser) => {
  const [data] = await pool.query(
    `SELECT u.idUser, c.idClass, u.nameUser, u.lastNameUser, s.stateStudent FROM student s, user u, class c WHERE s.idClass = c.idClass AND s.idUser = u.idUser AND c.idClass = ? AND u.idUser = ?`,
    [idClass, idUser]
  );
  return data[0];
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

const updateClassStudent = async (idClass, idUser, state) => {
  await existClass(idClass);
  await getIdUser(idUser);
  const data = await pool.query(
    `UPDATE student SET stateStudent = ? WHERE idClass = ? AND idUser = ? `,
    [state, idClass, idUser]
  );

  return await getIdClassStudent(idClass);
};

module.exports = {
  getPageClassStudent,
  createClassStudent,
  getIdClassStudent,
  removeClassStudent,
  allClassStudent,
  updateClassStudent,
  allClassStudentOff,
  getIdClassIdStudent,
};
