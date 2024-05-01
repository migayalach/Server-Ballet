const pool = require("../dataBase/conexion");
const {
  existIdHours,
  existUser,
  existIdTypeClass,
  existParallel,
  allClass,
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

// TODO MOSTRAR POR PAGINA
const getPageClass = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allClass();
  return responseData(response, "class", page);
};

// TODO MOSTRAR DATOS POR ID DEL USER
const getIdClass = async (idClass) => {
  if (isNumber(idClass)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const [data] = await pool.query(
    "SELECT c.idClass, h.idHours, h.totalTime, h.stateHours, s.idUser, s.nameUser, s.lastNameUser, s.carnetUser, e.department, t.idTypeClass, t.nameClass, c.parallel, c.stateClass FROM class c, typeClass t, user s, hours h, extension e WHERE idClass = ? AND c.idTypeClass = t.idTypeClass AND c.idHours = h.idHours AND c.idUser = s.idUser AND  s.idExtension = e.idExtension",
    [idClass]
  );
  if (!data.length) {
    throw Error(`La clase que no se encutra registrado`);
  }
  return data[0];
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
  await getIdClass(idClass);
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
  return await getIdClass(idClass);
};

// TODO ELIMINAR CLASE
const removeClass = async (idClass) => {
  if (isNumber(idClass)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await getIdClass(idClass);
  await pool.query("DELETE FROM class WHERE idClass = ? ", [idClass]);
  return await getAllClass();
};

module.exports = {
  createClass,
  getAllClass,
  getIdClass,
  getPageClass,
  updateClass,
  removeClass,
};
