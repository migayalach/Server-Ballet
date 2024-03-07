const { responseData } = require("../utils/response");
const { isNumber, lengthNameLevel, toNumber } = require("../helpers/funcAux");

const getAllExtension = () => {
  return;
};

const getIdExtension = (idUser) => {
  if (!toNumber(idUser)) {
    throw Error(`El parametro debe ser un numero`);
  }
  return;
};

const createExtension = (idLevel, nameUser, emailUser, registrationNumber) => {
  if (!lengthNameLevel(nameUser)) {
    throw Error(`Por favor ingrese un nombre para el usuario`);
  }
  return;
};

const updateExtension = () => {};

const removeExtension = () => {};

module.exports = {
  getAllExtension,
  getIdExtension,
  createExtension,
  updateExtension,
  removeExtension,
};
