const pool = require("../dataBase/conexion");
const { existUser, existClass } = require("./controllerData");
const { responseData } = require("../utils/response");
const { isNumber, totalNoteAndState } = require("../helpers/funcAux");
const { getIdUser } = require("./userController");

// LISTA CON TODAS LOS DATOS NOTAS Y ESTADO PRINCIPALMENTE
const listNotes = async (idClass) => {
  const [listData] = await pool.query(
    `SELECT q.idUser, q.note, s.stateStudent FROM qualification q, params p, class c, user u, student s WHERE q.idParams = p.idParams AND c.idClass = p.idClass AND u.idUser = q.idUser AND s.idClass = c.idClass AND s.idUser = u.idUser AND c.idClass = ?`,
    [idClass]
  );
  return listData;
};

const clearDataList = (data) =>
  data.map(
    ({
      idUser,
      nameUser,
      lastNameUser,
      carnetUser,
      department,
      emailUser,
      numberPhone,
      photoUser,
      stateStudent,
    }) => ({
      idUser,
      nameUser,
      lastNameUser,
      carnetUser,
      department,
      emailUser,
      numberPhone,
      photoUser,
      stateStudent,
      note: 0,
    })
  );

const allClassStudentOff = async (idClass) => {
  const [data] = await pool.query(
    `SELECT c.idClass, u.idUser, u.nameUser, u.lastNameUser, u.emailUser, u.carnetUser, e.department, u.numberPhone, u.photoUser, s.stateStudent FROM class c, student s, user u, level l, extension e WHERE c.idClass = s.idClass AND u.idUser = s.idUser AND l.idLevel = u.idLevel AND e.idExtension = u.idExtension AND s.stateStudent = false AND c.idClass = ?`,
    [idClass]
  );
  return totalNoteAndState(clearDataList(data), await listNotes(idClass));
};

const allClassStudent = async (idClass) => {
  const [data] = await pool.query(
    `SELECT c.idClass, u.idUser, u.nameUser, u.lastNameUser, u.emailUser, u.carnetUser, e.department, u.numberPhone, u.photoUser, s.stateStudent FROM class c, student s, user u, level l, extension e WHERE c.idClass = s.idClass AND u.idUser = s.idUser AND l.idLevel = u.idLevel AND e.idExtension = u.idExtension AND s.stateStudent = true AND c.idClass = ?`,
    [idClass]
  );

  return totalNoteAndState(clearDataList(data), await listNotes(idClass));
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
};
