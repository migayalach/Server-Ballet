// BASE DE DATOS
const pool = require("../dataBase/conexion");
const { LEVEL, EXTENSION, STAFF } = require("../dataBase/dataBaseLocal");

function levelExist(idLevel) {
  if (idLevel) {
    return false;
  }
  return true;
}

function extensionExist(idExtension) {
  if (idExtension) {
    return false;
  }
  return true;
}

function userRepeated(carnetStaff) {
  if (carnetStaff) {
    return false;
  }
  return true;
}

module.exports = {
  levelExist,
  extensionExist,
  userRepeated,
};
