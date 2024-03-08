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

const createUser = (
  idLevel,
  idExtension,
  nameUser,
  emailUser,
  carnet,
  registrationNumber
) => {
  if (!toNumber(idLevel)) {
    throw Error(`idLevel debe ser un numero`);
  }
  if (!isNumber(idExtension)) {
    throw Error(`idExtension debe ser un numero`);
  }
  if (!lengthNameLevel(nameUser)) {
    throw Error(`Por favor ingrese un nombre para el usuario`);
  }
  if (!lengthNameLevel(emailUser)) {
    throw Error(`Por favor ingrese un email para el usuario`);
  }
  if (!toNumber(carnet) || !isNumber(carnet)) {
    throw Error(`Carnet debe ser un numero`);
  }
  if (!lengthNameLevel(registrationNumber)) {
    throw Error(`Por favor ingrese un numero de registro para el usuario`);
  }
  if (toNumber(registrationNumber)) {
    throw Error(`El numero de registro no debe ser un numero`);
  }
  return;
};

const updateUser = (
  idUser,
  idLevel,
  idExtension,
  nameUser,
  emailUser,
  carnet,
  registrationNumber
) => {
  if (!toNumber(idUser)|| !isNumber(idUser)) {
    throw Error(`idUser debe ser un numero`);
  }
  if (!toNumber(idLevel)) {
    throw Error(`idLevel debe ser un numero`);
  }
  if (!isNumber(idExtension)) {
    throw Error(`idExtension debe ser un numero`);
  }
  if (!lengthNameLevel(nameUser)) {
    throw Error(`Por favor ingrese un nombre para el usuario`);
  }
  if (!lengthNameLevel(emailUser)) {
    throw Error(`Por favor ingrese un email para el usuario`);
  }
  if (!toNumber(carnet) || !isNumber(carnet)) {
    throw Error(`Carnet debe ser un numero`);
  }
  if (!lengthNameLevel(registrationNumber)) {
    throw Error(`Por favor ingrese un numero de registro para el usuario`);
  }
  if (toNumber(registrationNumber)) {
    throw Error(`El numero de registro no debe ser un numero`);
  }
  return;
};

const removeUser = (idUser) => {
  if (!toNumber(idUser)) {
    throw Error(`El parametro debe ser un numero`);
  }
  return;
};

module.exports = {
  createUser,
  getAllUser,
  getIdUser,
  updateUser,
  removeUser,
};
