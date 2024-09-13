const pool = require("../dataBase/conexion");
const {
  existIdHours,
  existUser,
  existIdTypeClass,
  existParallel,
  allClass,
  existClass,
} = require("./controllerData");
const responseData = require("../utils/response");
const {
  lengthName,
  isString,
  isNumber,
  stateBoolean,
} = require("../helpers/funcAux");

// TODO CREACION DE CLASE
const createClass = async (
  idUserCreate,
  idHours,
  idUser,
  idTypeClass,
  parallel
) => {
  if (isNaN(+idHours) || isNaN(+idUser) || isNaN(+idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (isString(+idHours) || isString(+idUser) || isString(+idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (!isString(parallel) || !lengthName(parallel)) {
    throw Error(`Por favor asigne un paralelo a esta clase`);
  }
  if (!(await existIdHours(+idHours))) {
    throw Error(`La hora que intensa asignar no se encuentra disponible`);
  }
  await existUser(idUser);
  if (!(await existIdTypeClass(+idTypeClass))) {
    throw Error(
      `Lo siento el tipo de clase que intenta seleccionar no se encutra disponible`
    );
  }
  await existParallel(parallel);
  const [ResultSetHeader] = await pool.query(
    "INSERT INTO class (idHours, idUser, idTypeClass, parallel) VALUES (?, ?, ?, ?)",
    [idHours, idUser, idTypeClass, parallel]
  );
  const classData = await getByIdClass(ResultSetHeader.insertId);
  const infoData = await getAllClass(idUserCreate);
  return { classData, infoData, state: "create" };
};

// TODO MOSTRAR TODAS LAS CLASES
const getAllClass = async (idUser) => {
  const page = 1;
  const response = await allClass(idUser);
  return responseData(response, "class", page, idUser);
};

const getByIdClass = async (idClass) => {
  await existClass(idClass);
  const [data] = await pool.query(
    `SELECT c.*, h.totalTime, h.stateHours, u.nameUser, u.lastNameUser, t.nameClass FROM class c, hours h, user u, typeClass t WHERE idClass = ? AND c.idHours = h.idHours AND c.idUser = u.idUser AND c.idTypeClass = t.idTypeClass`,
    [idClass]
  );
  return data[0];
};

const getAllClassId = async (idLevel, idUser) => {
  return ":D";
};

// TODO MOSTRAR POR PAGINA
const getPageClass = async (page, idUser) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allClass(idUser);
  return responseData(response, "class", page, idUser);
};

// TODO EDITAR CLASE
const updateClass = async (
  idClass,
  idHours,
  idUser,
  idTypeClass,
  parallel,
  stateClass
) => {
  if (isString(+idHours) || isString(+idUser) || isString(+idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (!isString(parallel) || !lengthName(parallel)) {
    throw Error(`Por favor asigne un paralelo a esta clase`);
  }
  // stateBoolean(stateClass);
  await existClass(+idClass);
  if (!(await existIdHours(+idHours))) {
    throw Error(`La hora que intensa asignar no se encuentra disponible`);
  }
  await existUser(+idUser);
  if (!(await existIdTypeClass(+idTypeClass))) {
    throw Error(
      `Lo siento el tipo de clase que intenta seleccionar no se encutra disponible`
    );
  }
  // await existParallel(parallel);
  await pool.query(
    "UPDATE class SET idHours = ?, idUser = ?, idTypeClass = ?, parallel = ?, stateClass = ? WHERE idClass = ?",
    [idHours, idUser, idTypeClass, parallel, stateClass, idClass]
  );
  return await getByIdClass(idClass);
};

// TODO ELIMINAR CLASE
const removeClass = async (idUser, idClass) => {
  if (isNumber(idClass)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await existClass(idClass);
  const [count] = await pool.query(
    `SELECT count(s.idClass) AS students FROM class c, student s WHERE c.idClass = s.idClass AND  s.idClass = ?`,
    [idClass]
  );

  if (count[0].students > 0) {
    throw Error(
      `Esta clase no puede ser eliminada ya que actualmente cuenta con alumnos`
    );
  }

  await pool.query("DELETE FROM class WHERE idClass = ? ", [idClass]);

  const infoData = await getAllClass(idUser);
  return { infoData, state: "delete" };
};

module.exports = {
  createClass,
  getAllClass,
  getByIdClass,
  getPageClass,
  getAllClassId,
  updateClass,
  removeClass,
};
