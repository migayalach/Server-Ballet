const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const {
  getContactAll,
  existContact,
} = require("../controllers/controllerData");

const createContact = async (nameContact, emailContact, phoneContact) => {
  const [data] = await pool.query(`SELECT emailContact FROM sendContact WHERE emailContact = ?`, [emailContact]);
  
  if (data.length) {
    throw Error(`Este email ya se encuentra registrado!`);
  }

  await pool.query(
    `INSERT INTO sendContact (dateContact, nameContact, emailContact, phoneContact) VALUES (CURRENT_DATE, ?, ?, ?)`,
    [nameContact, emailContact, phoneContact]
  );

  return { message: "Registrado con exito", state: "success" };
};

const getAllContact = async () => {
  const data = await getContactAll();
  if (!data.length) {
    throw Error`No hay registros disponibles`;
  }
  return responseData(data, "contact", (page = 1));
};

const getPageContact = async (page) => {
  const response = await getContactAll();
  return responseData(response, "contact", page);
};

const getIdContact = async (idContact) => {
  const [data] = await pool.query(
    `SELECT * FROM sendContact WHERE idContact = ?`,
    [idContact]
  );
  if (!data.length) {
    throw Error`Este contacto no se encuentra registrado`;
  }
  return data[0];
};

const updateContact = async (idContact, stateContact, feedback) => {
  if (!(await existContact(idContact))) {
    throw Error(`No se pudo encontrar el usuario seleccionado`);
  }
  await pool.query(
    `UPDATE sendContact SET stateContact = ?, feedback = ? WHERE idContact = ?`,
    [stateContact, feedback, idContact]
  );
  return await getIdContact(idContact);
};

module.exports = {
  createContact,
  getAllContact,
  getPageContact,
  getIdContact,
  updateContact,
};
