const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");

const createContact = async (
  dateContact,
  nameContact,
  emailContact,
  phoneContact
) => {
  return `${dateContact} - ${nameContact} - ${emailContact} - ${phoneContact}`;
};

const getAllContact = async () => {
  return "todo";
};

const getPageContact = async (page) => {
  return `${page}`;
};

const getIdContact = async (idContact) => {
  return `${idContact}`;
};

const updateContact = async (idContact, stateContact, feedback) => {
  return `${idContact} ---- ${stateContact} ---- ${feedback}`;
};

module.exports = {
  createContact,
  getAllContact,
  getPageContact,
  getIdContact,
  updateContact,
};
