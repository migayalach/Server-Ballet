const responseData = require("../utils/response");

const pool = require("../dataBase/conexion");

const createQualification = async (idClass, idStudent, notes, average) => {
  await pool.query("INSERT INTO ")  
};

module.exports = {
  createQualification,
};
