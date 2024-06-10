const responseData = require("../utils/response");
const pool = require("../dataBase/conexion");
const { getIdUser } = require("./userController");

const createQualification = async (idClass, idStudent, qualification) => {
  // await pool.query("INSERT INTO ")
  // console.log(idClass);
  // console.log(idStudent);
  // console.log(qualification);
  // return;
};

const getAllStaff = async () => {
  // const [data] = await pool.query(`SELECT * FROM qualification`);
  // return data;
};

const getIdQualificationAll = async (idUser) => {
  const page = 1;
  const { nameLevel } = await getIdUser(idUser);
  if (nameLevel === "Estudiante" || nameLevel === "Secretaria") {
    throw Error(`Lo siento usted no tiene permiso para acceder`);
  }
  let query =
    "SELECT p.idParams, p.idClass, c.parallel, u.nameUser, u.lastNameUser, p.dateTest, p.title FROM params p, class c, user u WHERE p.idClass = c.idClass AND u.idUser = c.idUser ";
  if (nameLevel === "Director") {
    const [data] = await pool.query(query);
    if (!data.length) {
      throw Error`No se encontraron clases`;
    }
    return responseData(data, "qualificationList", page);
  } else if (nameLevel === "Profesor") {
    query += `AND c.idUser = ${idUser}`;
    const [data] = await pool.query(query);
    if (!data.length) {
      throw Error`No se encontraron clases`;
    }
    return responseData(data, "qualificationList", page);
  }
};

module.exports = {
  createQualification,
  getAllStaff,
  getIdQualificationAll,
};
