const { responseData } = require("../utils/response");
const { isNumber, lengthNameLevel, toNumber } = require("../helpers/funcAux");
const pool = require("../dataBase/conexion");

const createLevel = async (nameLevel) => {
  if (!lengthNameLevel(nameLevel)) {
    throw Error(`Por favor ingrese un nombre para el nivel`);
  }
  return;
};

const getAllLevel = async () => {
  // const [response] = await pool.query("select * from level");
  // return responseData(response);
  return;
};

const getIdLevel = async (idLevel) => {
  if (!toNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  return;
};

const updateLevel = async (idLevel, nameLevel) => {
  if (!toNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  } else if (!lengthNameLevel(nameLevel)) {
    throw Error(`Por favor ingrese un nombre para el nivel`);
  }
  return;
};

const removeLevel = async (idLevel) => {
  if (!toNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  return;
};

module.exports = {
  createLevel,
  getAllLevel,
  getIdLevel,
  updateLevel,
  removeLevel,
};
