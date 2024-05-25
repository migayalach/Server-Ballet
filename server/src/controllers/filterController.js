const responseData = require("../utils/response");
const pool = require("../dataBase/conexion");

const filterUser = async (
  search,
  order,
  nameOrLastName,
  idLevel,
  idExtension,
  stateUser,
  stateOrTime,
  page
) => {
  switch (search) {
    case "user":
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
        search,
        order,
        nameOrLastName,
        idLevel,
        idExtension,
        stateUser,
      };
      return responseData(data, "filter", page, queryData);

    case "typeHours":
      let queryTH = "SELECT * FROM typeClass";
      if (order !== undefined) {
        queryTH += ` ORDER BY nameClass ${order}`;
      }
      const [dataTH] = await pool.query(queryTH);
      if (!dataTH.length) throw Error(`No se encontro nada`);
      const queryDataTH = {
        search,
        order,
      };
      return responseData(dataTH, "filter", page, queryDataTH);

    case "hours":
      let queryH = "SELECT * FROM hours";
      if (order !== undefined && stateOrTime !== undefined) {
        queryH += ` ORDER BY ${stateOrTime} ${order}`;
      }
      const [dataH] = await pool.query(queryH);
      if (!dataH.length) throw Error(`No se encontro nada`);
      const queryDataH = {
        search,
        order,
        stateOrTime,
      };
      return responseData(dataH, "filter", page, queryDataH);

    default:
      break;
  }
};

module.exports = { filterUser };
