const { responseData } = require("../utils/response");
const { isNumber, lengthNameLevel, toNumber } = require("../helpers/funcAux");

const getAllUser = () => {
  return;
};

const getIdUser = (idUser) => {
  if (!toNumber(idUser)) {
    throw Error(`El parametro debe ser un numero`);
  }
  return;
};

const createUser = (idLevel, nameUser, emailUser, registrationNumber) => {
  
  if (!lengthNameLevel(nameUser)) {
    throw Error(`Por favor ingrese un nombre para el usuario`);
  }
  return;
};

const updateUser = () => {};

const removeUser = () => {};

module.exports = {
  createUser,
  getAllUser,
  getIdUser,
  updateUser,
  removeUser,
};
