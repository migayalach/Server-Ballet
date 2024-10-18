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

const allHours = async () => {
  const [data] = await pool.query(`SELECT * FROM hours WHERE stateHours = 1`);
  return data;
};

const allStudents = async (idClass) => {
  let [users] = await pool.query(
    `SELECT u.idUser, u.photoUser, u.nameUser, u.lastNameUser, u.carnetUser FROM user u, level l WHERE u.idLevel = l.idLevel AND l.nameLevel = "Estudiante" AND u.stateUser = true`
  );
  const [students] = await pool.query(
    `SELECT idUser FROM student WHERE idClass = ?`,
    [idClass]
  );

  for (let i = 0; i < students.length; i++) {
    users = users.filter((index) => index.idUser !== students[i].idUser);
  }

  return users;
};

module.exports = { allTeacher, allTypeDance, allHours, allStudents };
