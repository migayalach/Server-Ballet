const responseData = require("../utils/response");
const pool = require("../dataBase/conexion");

const filterUser = async (
  order,
  nameOrLastName,
  idLevel,
  idExtension,
  stateUser,
  page
) => {
  let query = `SELECT u.idUser, u.idLevel, l.nameLevel, u.idExtension, e.department, u.nameUser, u.lastNameUser, u.emailUser, u.addressUser, u.dateBirthUser, u.carnetUser, u.photoUser, u.stateUser 
  FROM user u, level l, extension e 
  WHERE u.idLevel = l.idLevel 
    AND u.idExtension = e.idExtension`;

  if (stateUser !== undefined) {
    query += ` AND u.stateUser = ${stateUser}`;
  }

  if (idLevel !== undefined) {
    query += ` AND l.idLevel = ${idLevel}`;
  }

  if (idExtension !== undefined) {
    query += ` AND e.idExtension = ${idExtension}`;
  }

  if (order !== undefined) {
    query += ` ORDER BY ${nameOrLastName} ${order}`;
  }

  const [data] = await pool.query(query);
  if (!data.length) throw Error(`No se encontro nada`);
  const queryData = {
    order,
    nameOrLastName,
    idLevel,
    idExtension,
    stateUser,
  };
  return responseData(data, "filter", page, queryData);
};

module.exports = { filterUser };
