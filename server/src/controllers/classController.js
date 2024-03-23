const pool = require("../dataBase/conexion");
const {
  existIdHours,
  existStaff,
  existIdTypeClass,
  existParallel,
  allClass,
} = require("./controllerData");
const responseData = require("../utils/response");
const { lengthName, isString, isNumber } = require("../helpers/funcAux");

const createClass = async (idHours, idStaff, idTypeClass, parallel) => {
  if (isNaN(idHours) || isNaN(idStaff) || isNaN(idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (isString(idHours) || isString(idStaff) || isString(idTypeClass)) {
    throw Error(`Por favor ingrese los parametros requeridos`);
  }
  if (!isString(parallel) || !lengthName(parallel)) {
    throw Error(`Por favor asigne un paralelo a esta clase`);
  }
  if (!(await existIdHours(idHours))) {
    throw Error(`La hora que intensa asignar no se encuentra disponible`);
  }
  await existStaff(idStaff);
  if (!(await existIdTypeClass(idTypeClass))) {
    throw Error(
      `Lo siento el tipo de clase que intenta seleccionar no se encutra disponible`
    );
  }
  await existParallel(parallel);
  await pool.query(
    "INSERT INTO class (idHours, idStaff, idTypeClass, parallel) VALUES (?, ?, ?, ?)",
    [idHours, idStaff, idTypeClass, parallel]
  );
  return true;
  // return await getAllClass();
};

const getAllClass = async () => {
  const page = 1;
  const response = await allClass();
  return responseData(response, "class", page);
};

const getPageClass = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allClass();
  return responseData(response, "class", page);
};

const getIdClass = async (idClass) => {
  if (isNumber(idClass)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const [data] = await pool.query("SELECT * FROM class WHERE idClass = ? ", [
    idClass,
  ]);
  if (!data.length) {
    throw Error(`La clase que no se encutra registrado`);
  }
  return data[0];
};

const updateClass = async (
  idClass,
  idHours,
  idStaff,
  idTypeClass,
  parallel,
  stateClass
) => {
  
  return ":D";
};

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
