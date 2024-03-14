const responseData = require("../utils/response");
const { isNumber, lengthNameLevel, toNumber } = require("../helpers/funcAux");
const pool = require("../dataBase/conexion");
const { LEVEL } = require("../dataBase/dataBaseLocal");

function existIdLevel(idLevel) {
  // TESTING
  const data = LEVEL.find((index) => index.idLevel === idLevel);
  if (!data) {
    return false;
  }
  return true;
}

function repeatedLevel(nameLevel) {
  // TESTING
  const data = LEVEL.find(
    (index) => index.nameLevel === nameLevel.toUpperCase()
  );
  if (!data) {
    return false;
  }
  return true;
}

const createLevel = async (nameLevel) => {
  if (!lengthNameLevel(nameLevel)) {
    throw Error(`Por favor ingrese un nombre para el nivel`);
  }
  if (repeatedLevel(nameLevel)) {
    throw Error(`El nombre que intenta agregar ya existe`);
  }
  return getAllLevel();
};

const getAllLevel = () => {
  const page = 1;
  // const [response] = await pool.query("select * from level");
  // return responseData(response);
  // *TESTING
  const response = responseData(LEVEL, "level", page);
  return response;
};

const getPageLevel = (page) => {
  const response = responseData(LEVEL, "level", page);
  return response;
};

const getIdLevel = (idLevel) => {
  if (!toNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  // *TESTING
  const response = LEVEL.find((index) => index.idLevel === +idLevel);
  return response;
};

const updateLevel = async (idLevel, nameLevel) => {
  if (!toNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  } else if (!lengthNameLevel(nameLevel)) {
    throw Error(`Por favor ingrese un nombre para el nivel`);
  }
  if (!existIdLevel(idLevel)) {
    throw Error(`El nivel que usted quiere cambiar no existe`);
  }
  // TESTING
  const [testing] = LEVEL.filter((index) => index.idLevel === idLevel);
  return testing;
};

const removeLevel = async (idLevel) => {
  if (isNaN(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!existIdLevel(+idLevel)) {
    throw Error(`El nivel que usted quiere eliminar no existe`);
  }
  return getAllLevel();
};

module.exports = {
  createLevel,
  getAllLevel,
  getPageLevel,
  getIdLevel,
  updateLevel,
  removeLevel,
};
