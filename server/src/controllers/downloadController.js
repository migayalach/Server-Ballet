const pool = require("../dataBase/conexion.js");
const { existUser } = require("./controllerData");

const generatePdf = () => {
  console.log("PDF");
};

const generateExcel = () => {
  console.log("EXCEL");
};

const generateArchive = async (idUser, option) => {
  await existUser(idUser);
  if (option === "PDF") {
    generatePdf();
  } else if (option === "EXCEL") {
    generateExcel();
  }
};

module.exports = generateArchive;

// GENERAR EXCEL Y PDF PARA ASISTENCIA, NOTAS  Y LISTA DE ALUMNOS