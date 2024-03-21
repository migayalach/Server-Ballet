const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const {
  isNumber,
  lengthName,
  lengthElderForElementents,
} = require("../helpers/funcAux");
const {
  allExtension,
  existExtension,
  repeatedNameExtension,
  repeatedExtension,
} = require("./controllerData");

const getAllExtension = async () => {
  const page = 1;
  const response = await allExtension();
  return responseData(response, "extension", page);
};

const getPageExtension = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allExtension();
  return responseData(response, "extension", page);
};

const createExtension = async (nameExtension) => {
  if (isNumber(nameExtension)) {
    throw Error(`El parametro no debe ser un numero`);
  }
  if (!lengthName(nameExtension)) {
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
  const data = await existExtension(idExtension);
  if (!data) {
    throw Error(`La extension que usted intenta modificar no existe`);
  }
  return data;
};

const updateExtension = async (idExtension, nameExtension) => {
  if (isNaN(idExtension)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!lengthName(nameExtension)) {
    throw Error(`Por favor ingrese un nombre para la extension`);
  }
  if (!lengthElderForElementents(nameExtension)) {
    throw Error(`La extension no debe ser mayor a cuatro caracteres`);
  }
  if (!isNaN(nameExtension)) {
    throw Error(`El nombre de la extension no debe ser un numero`);
  }
  // if ((await repeatedNameExtension(nameExtension)).length) {
  //   throw Error(`No puede haber elementos repetidos`);
  // }
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
