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

const infoCourse = async (idUser) => {
  const [infoClassUser] = await pool.query(
    `SELECT c.idClass, t.nameClass, h.startTime, h.endTime, c.parallel, c.stateClass FROM user u, class c, student s, typeClass t, hours h WHERE u.idUser = s.idClass AND c.idClass = s.idClass AND t.idTypeClass = c.idTypeClass AND c.idHours = h.idHours AND s.idUser = ?`,
    [idUser]
  );
  return infoClassUser;
};

module.exports = {
  allTeacher,
  allTypeDance,
  allHours,
  allStudents,
  infoCourse,
};
