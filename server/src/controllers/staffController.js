const responseData = require("../utils/response");
const { isNumber, lengthNameLevel, toNumber } = require("../helpers/funcAux");
const pool = require("../dataBase/conexion");
const { LEVEL, EXTENSION, STAFF } = require("../dataBase/dataBaseLocal");
const {
  levelExist,
  extensionExist,
  userRepeated,
} = require("./controllerData");

const createStaff = (
  idLevel,
  idExtension,
  nameStaff,
  lastNameStaff,
  emailStaff,
  addressStaff,
  dateBirthStaff,
  carnetStaff,
  photoStaff
) => {
  if (!isNumber(idLevel) || !isNumber(idExtension)) {
    throw Error(`Los id de nivel y extension deben ser numeros`);
  }
  if (!levelExist(idLevel)) {
    throw Error(`El nivel de acceso no existe`);
  }
  if (
    lengthNameLevel(nameStaff) ||
    lengthNameLevel(lastNameStaff) ||
    lengthNameLevel(emailStaff)
  ) {
    throw Error(`Por favor ingrese los datos requeridos`);
  }

  if (isNumber(carnetStaff) || isNaN(carnetStaff)) {
    throw Error(`Por favor ingrese la extension de la CI del usuario`);
  }
  if (!extensionExist(idExtension)) {
    throw Error(`La extension no existe`);
  }
  if (!userRepeated(carnetStaff)) {
    throw Error(`Este usuario ya se encuentra registrado`);
  }
  
  // CREATE
  return getAllStaff();
};

const getAllStaff = () => {

};

const getPageStaff = (page) => {
  
};

const getIdStaff = () => {};
const updateStaff = () => {};
const removeStaff = () => {};

module.exports = {
  createStaff,
  getAllStaff,
  getPageStaff,
  getIdStaff,
  updateStaff,
  removeStaff,
};
