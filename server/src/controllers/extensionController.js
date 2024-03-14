const responseData = require("../utils/response");
const {
  isNumber,
  lengthNameLevel,
  toNumber,
  lengthElderForElementents,
} = require("../helpers/funcAux");
const pool = require("../dataBase/conexion");
const {
  localDataBase,
  LEVEL,
  EXTENSION,
  STAFF,
  HOURS,
  TYPECLASS,
  CLASS,
  STUDENT,
  PAYMENT,
  QUALIFICATION,
  ASSISTANCE,
} = require("../dataBase/dataBaseLocal");

const getAllExtension = () => {
  return;
};

const getIdExtension = (idUser) => {
  if (!toNumber(idUser)) {
    throw Error(`El parametro debe ser un numero`);
  }
  return;
};

const createExtension = (nameExtension) => {
  if (toNumber(nameExtension)) {
    throw Error(`El parametro no debe ser un numero`);
  }
  if (!lengthNameLevel(nameExtension)) {
    throw Error(`Por favor ingrese un nombre para la extension`);
  }
  if (!lengthElderForElementents(nameExtension)) {
    throw Error(`La extension no debe ser mayor a cuatro caracteres`);
  }
  return;
};

const updateExtension = (idExtension, nameExtension) => {
  if (!toNumber(idExtension)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!lengthNameLevel(nameExtension)) {
    throw Error(`Por favor ingrese un nombre para la extension`);
  }
  if (!lengthElderForElementents(nameExtension)) {
    throw Error(`La extension no debe ser mayor a cuatro caracteres`);
  }
  if (toNumber(nameExtension)) {
    throw Error(`El nombre de la extension no debe ser un numero`);
  }
  return;
};

const removeExtension = (idExtension) => {
  if (!toNumber(idExtension)) {
    throw Error(`El parametro debe ser un numero`);
  }
  return;
};

module.exports = {
  getAllExtension,
  getIdExtension,
  createExtension,
  updateExtension,
  removeExtension,
};
