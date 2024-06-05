const responseData = require("../utils/response");

const pool = require("../dataBase/conexion");

const createQualification = async (idClass, idStudent, qualification) => {
  // await pool.query("INSERT INTO ")
  console.log(idClass);
  console.log(idStudent);
  console.log(qualification);
  return;
};

module.exports = {
  createQualification,
};
