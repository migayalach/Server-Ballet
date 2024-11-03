const { responseData } = require("../utils/response");
const {
  allTypeClass,
  matchNameClass,
  existIdTypeClass,
} = require("./controllerData");
const { isNumber, isString, lengthName } = require("../helpers/funcAux");
const pool = require("../dataBase/conexion");

const createTypeClass = async (nameClass, description) => {
  if (await matchNameClass(nameClass)) {
    throw Error(`Lo siento no pueden haber tipo de clases repetidas`);
  }
  const [ResultSetHeader] = await pool.query(
    `INSERT INTO typeClass (nameClass, description) VALUES(?,?)`,
    [nameClass, description]
  );
  const typeClassData = await getIdTypeClass(ResultSetHeader.insertId);
  const infoData = await getAllTypeClass();
  return { typeClassData, infoData, state: "create-typeClass" };
};

const getAllTypeClass = async () => {
  const page = 1;
  const response = await allTypeClass();
  return responseData(response, "typeClass", page);
};

const getPageTypeClass = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allTypeClass();
  return responseData(response, "typeClass", page);
};

const getIdTypeClass = async (idTypeClass) => {
  const [data] = await pool.query(
    "SELECT * FROM typeClass WHERE idTypeClass = ?",
    [idTypeClass]
  );
  if (!data.length) {
    throw Error(`La tipo de clase que usted busca no se encuentra registrado`);
  }
  return data[0];
};

const updateTypeClass = async (idTypeClass, nameClass, description) => {
  if (isNumber(idTypeClass) || isString(idTypeClass)) {
    throw Error(`El parametro debe ser un numero`);
  }
  if (!lengthName(nameClass)) {
    throw Error(`Por favor ingrese un nombre para el tipo de clase`);
  }
  if (!(await existIdTypeClass(idTypeClass))) {
    throw Error(`El tipo de clase que usted quiere modificar no existe`);
  }
  await pool.query(
    "UPDATE typeClass SET nameClass = ?, description = ? WHERE idTypeClass = ?",
    [nameClass, description, idTypeClass]
  );
  return await getIdTypeClass(idTypeClass);
};

const removeTypeClass = async (idTypeClass) => {
  if (!(await existIdTypeClass(+idTypeClass))) {
    throw Error(`El tipo de clase que usted quiere eliminar no existe`);
  }
  await pool.query("DELETE FROM typeClass WHERE idTypeClass = ?", [
    idTypeClass,
  ]);
  const infoData = await getAllTypeClass();
  return { infoData, state: "delete-typeClass" };
};

module.exports = {
  createTypeClass,
  getAllTypeClass,
  getPageTypeClass,
  getIdTypeClass,
  updateTypeClass,
  removeTypeClass,
};
