const responseData = require("../utils/response");
const { isNumber, lengthNameLevel, toNumber } = require("../helpers/funcAux");
const pool = require("../dataBase/conexion");
const { LEVEL } = require("../dataBase/dataBaseLocal");

async function existIdLevel(idLevel) {
  const [data] = await pool.query(
    `SELECT idLevel FROM level WHERE idLevel=${idLevel}`
  );
  if (!data.length) {
    return false;
  }
  return true;
}

async function repeatedLevel(nameLevel) {
  const [data] = await pool.query(
    `SELECT nameLevel from level WHERE nameLevel LIKE '%${nameLevel}%'`
  );
  if (!data.length) {
    return false;
  }
  return true;
}

const createHours = async (nameLevel) => {
  if (!lengthNameLevel(nameLevel)) {
    throw Error(`Por favor ingrese un nombre para el nivel`);
  }
  if (await repeatedLevel(nameLevel)) {
    throw Error(`El nombre que intenta agregar ya existe`);
  }
  await pool.query("INSERT INTO level (nameLevel) VALUES(?)", [nameLevel]);
  return getAllLevel();
};

const getAllHours = async () => {
  const page = 1;
  const [response] = await pool.query("select * from level");
  return responseData(response, "level", page);
};

const getPageHours = async (page) => {
  const response = responseData(LEVEL, "level", page);
  return response;
};

const getIdHours = async (idLevel) => {
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

const updateHours = async (idLevel, nameLevel) => {
  if (!toNumber(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!lengthNameLevel(nameLevel)) {
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

const removeHours = async (idLevel) => {
  if (isNaN(idLevel)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!(await existIdLevel(+idLevel))) {
    throw Error(`El nivel que usted quiere eliminar no existe`);
  }
  await pool.query(`DELETE FROM level WHERE idLevel = ?`, [idLevel]);
  return await getAllLevel();
};

module.exports = {
  createHours,
  getAllHours,
  getPageHours,
  getIdHours,
  updateHours,
  removeHours,
};
