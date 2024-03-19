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

async function repeatedNameExtension(nameExtension) {
  const [data] = await pool.query(
    `SELECT department FROM extension WHERE department LIKE ?`,
    [`%${nameExtension}%`]
  );
  return data;
}

async function repeatedExtension(nameExtension) {
  const [data] = await pool.query(
    `SELECT department FROM extension WHERE department LIKE ?`,
    [`%${nameExtension}%`]
  );
  if (!data.length) {
    return false;
  }
  return true;
}

const getAllExtension = async () => {
  const page = 1;
  const [response] = await pool.query(`SELECT * FROM extension`);
  return responseData(response, "extension", page);
};

const getPageExtension = async (page) => {
  const [response] = await pool.query(`SELECT * FROM extension`);
  return responseData(response, "extension", page);
};

const createExtension = async (nameExtension) => {
  if (toNumber(nameExtension)) {
    throw Error(`El parametro no debe ser un numero`);
  }
  if (!lengthNameLevel(nameExtension)) {
    throw Error(`Por favor ingrese un nombre para la extension`);
  }
  if (await repeatedExtension(nameExtension)) {
    throw Error(`No puedo haber extensiones repetidas`);
  }
  if (!lengthElderForElementents(nameExtension)) {
    throw Error(`La extension no debe ser mayor a cuatro caracteres`);
  }
  await pool.query(`INSERT INTO extension (department) VALUES(?)`, [
    nameExtension,
  ]);
  return await getAllExtension();
};

const getIdExtension = async (idExtension) => {
  const [data] = await pool.query(
    "SELECT * FROM extension WHERE idExtension = ?",
    [idExtension]
  );
  if (!data.length) {
    throw Error(`La extension que usted intenta modificar no existe`);
  }
  return data[0];
};

const updateExtension = async (idExtension, nameExtension) => {
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
  if ((await repeatedNameExtension(nameExtension)).length) {
    throw Error(`No puede haber elementos repetidos`);
  }
  await pool.query(
    `UPDATE extension SET department = ? WHERE idExtension = ?`,
    [nameExtension, idExtension]
  );
  return await getIdExtension(idExtension);
};

const removeExtension = async (idExtension) => {
  if (isNaN(idExtension)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await getIdExtension(+idExtension);
  await pool.query(`DELETE FROM extension WHERE idExtension = ?`, [
    idExtension,
  ]);
  return await getAllExtension();
};

module.exports = {
  getAllExtension,
  getPageExtension,
  createExtension,
  updateExtension,
  removeExtension,
};
