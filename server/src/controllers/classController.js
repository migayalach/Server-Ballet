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
const createClass = async (idHours, idUser, idTypeClass, parallel) => {
  if (isNaN(idHours) || isNaN(idUser) || isNaN(idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (isString(idHours) || isString(idUser) || isString(idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (!isString(parallel) || !lengthName(parallel)) {
    throw Error(`Por favor asigne un paralelo a esta clase`);
  }
  if (!(await existIdHours(idHours))) {
    throw Error(`La hora que intensa asignar no se encuentra disponible`);
  }
  await existUser(idUser);
  if (!(await existIdTypeClass(idTypeClass))) {
    throw Error(
      `Lo siento el tipo de clase que intenta seleccionar no se encutra disponible`
    );
  }
  await existParallel(parallel);
  await pool.query(
    "INSERT INTO class (idHours, idUser, idTypeClass, parallel) VALUES (?, ?, ?, ?)",
    [idHours, idUser, idTypeClass, parallel]
  );
  return await getAllClass();
};

// TODO MOSTRAR TODAS LAS CLASES
const getAllClass = async () => {
  const page = 1;
  const response = await allClass();
  return responseData(response, "class", page);
};

const getByIdClass = async (idClass) => {
  await existClass(idClass);
  const [data] = await pool.query(
    `SELECT c.*, h.totalTime, h.stateHours, u.nameUser, u.lastNameUser, t.nameClass FROM class c, hours h, user u, typeClass t WHERE idClass = ? AND c.idHours = h.idHours AND c.idUser = u.idUser AND c.idTypeClass = t.idTypeClass`,
    [idClass]
  );
  return data[0];
};

// TODO MOSTRAR POR PAGINA
const getPageClass = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allClass();
  return responseData(response, "class", page);
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
  // if (
  //   isNaN(idClass) ||
  //   isNaN(idHours) ||
  //   isNaN(idUser) ||
  //   isNaN(idTypeClass)
  // ) {
  //   throw Error(`Por favor ingrese los parametros requeridos`);
  // }
  if (isString(idHours) || isString(idUser) || isString(idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (!isString(parallel) || !lengthName(parallel)) {
    throw Error(`Por favor asigne un paralelo a esta clase`);
  }
  // stateBoolean(stateClass);
  await existClass(idClass);
  if (!(await existIdHours(idHours))) {
    throw Error(`La hora que intensa asignar no se encuentra disponible`);
  }
  await existUser(idUser);
  if (!(await existIdTypeClass(idTypeClass))) {
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
const removeClass = async (idClass) => {
  if (isNumber(idClass)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await existClass(idClass);
  await pool.query("DELETE FROM class WHERE idClass = ? ", [idClass]);
  return await getAllClass();
};

module.exports = {
  createClass,
  getAllClass,
  getByIdClass,
  getPageClass,
  updateClass,
  removeClass,
};
