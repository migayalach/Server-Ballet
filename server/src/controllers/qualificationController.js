const responseData = require("../utils/response");

const pool = require("../dataBase/conexion");

const createQualification = async (idClass, idStudent, qualification) => {
  // await pool.query("INSERT INTO ")
  console.log(idClass);
  console.log(idStudent);
  console.log(qualification);
  return;
};

const getAllStaff = async () => {
  const [data] = await pool.query(`SELECT * FROM qualification`);
  return data;
};

module.exports = {
  createQualification,
  getAllStaff,
};
