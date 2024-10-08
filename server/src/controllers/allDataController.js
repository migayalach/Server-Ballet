const pool = require("../dataBase/conexion");

const allTeacher = async () => {
  const [data] = await pool.query(
    `SELECT u.idUser, u.photoUser, u.nameUser, u.lastNameUser, u.carnetUser FROM user u, level l WHERE u.idLevel = l.idLevel AND  l.nameLevel = "Profesor" `
  );
  return data;
};

const allTypeDance = async () => {
  const [data] = await pool.query(`SELECT * FROM typeClass`);
  return data;
};

const allHours = async() => {
  const [data] = await pool.query(`SELECT * FROM hours WHERE stateHours = 1`);
  return data;
};

module.exports = { allTeacher, allTypeDance, allHours };
