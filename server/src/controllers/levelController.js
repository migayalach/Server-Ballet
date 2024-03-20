const responseData = require("../utils/response");
const { existIdLevel, repeatedLevel, allLevel } = require("./controllerData");
const { isNumber, isString, lengthName } = require("../helpers/funcAux");
const pool = require("../dataBase/conexion");

const createLevel = async (nameLevel) => {
  if (!lengthName(nameLevel)) {
    throw Error(`Por favor ingrese un nombre para el nivel`);
  }
  if (await repeatedLevel(nameLevel)) {
    throw Error(`El nombre que intenta agregar ya existe`);
  }
  await pool.query("INSERT INTO level (nameLevel) VALUES(?)", [nameLevel]);
  return getAllLevel();
};

const getAllLevel = async () => {
  const page = 1;
  const response = await allLevel();
  return responseData(response, "level", page);
};

const getPageLevel = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allLevel();
  return responseData(response, "level", page);
};

const getIdLevel = async (idLevel) => {
  if (isNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const [data] = await pool.query(`SELECT * FROM level WHERE idLevel = ?`, [
    idLevel,
  ]);
  if (!data.length) {
    throw Error(`El nivel que usted busca no se encuentra registrado`);
  }
  return data[0];
};

const updateLevel = async (idLevel, nameLevel) => {
  if (isNumber(idLevel) || isString(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!lengthName(nameLevel)) {
    throw Error(`Por favor ingrese un nombre para el nivel`);
  }
  await getIdLevel(idLevel);
  if (await repeatedLevel(nameLevel)) {
    throw Error(`El nombre que quiere cambiar ya se encuentra registrado`);
  }
  await existIdLevel(idLevel);
  await pool.query(`UPDATE level SET nameLevel = ? WHERE idLevel = ?`, [
    nameLevel,
    idLevel,
  ]);
  return await getIdLevel(idLevel);
};

const removeLevel = async (idLevel) => {
  if (isNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!(await existIdLevel(+idLevel))) {
    throw Error(`El nivel que usted quiere eliminar no existe`);
  }
  await pool.query(`DELETE FROM level WHERE idLevel = ?`, [idLevel]);
  return await getAllLevel();
};

module.exports = {
  createLevel,
  getAllLevel,
  getPageLevel,
  getIdLevel,
  updateLevel,
  removeLevel,
};
