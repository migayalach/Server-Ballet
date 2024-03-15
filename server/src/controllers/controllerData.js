// BASE DE DATOS
const pool = require("../dataBase/conexion");
const { LEVEL, EXTENSION, STAFF } = require("../dataBase/dataBaseLocal");

function levelExist(idLevel) {
  if (1) {
    return false;
  }
  return true;
}

function extensionExist(idExtension) {
  if (1) {
    return false;
  }
  return true;
}

function userRepeated(carnetStaff) {
  if (1) {
    return false;
  }
  return true;
}

module.exports = {
  levelExist,
  extensionExist,
  userRepeated,
};
