const responseData = require("../utils/response");
// const responseFilterData = require("../utils/filter/responseFilter");
const { getAllLevel } = require("../controllers/levelController");
const { getIdUser } = require("./userController");
const pool = require("../dataBase/conexion");

const filterUser = async (
  all,
  search,
  order,
  nameOrLastName,
  idLevel,
  idExtension,
  stateUser,
  totalTime,
  stateHours,
  idUser,
  idTypeClass,
  stateClass,
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
      const queryDataH = {
        search,
        order,
      };
      if (totalTime && !stateHours) {
        queryH += ` ORDER BY totalTime ${order}`;
        queryDataH.totalTime = totalTime;
      } else if (!totalTime && stateHours) {
        queryH += ` WHERE stateHours = ${stateHours} ORDER BY totalTime ${order}`;
        queryDataH.stateHours = stateHours;
      }

      const [dataH] = await pool.query(queryH);
      if (!dataH.length) throw Error(`No se encontro nada`);

      return responseData(dataH, "filter", page, queryDataH);

    case "class":
      let queryC =
        "SELECT c.idClass, h.totalTime, u.idUser, u.nameUser, u.lastNameUser, u.carnetUser, e.department, t.nameClass, c.parallel, c.stateClass FROM class c, typeClass t, user u, hours h, extension e WHERE ";
      const queryDataC = {
        search,
        order,
        stateClass,
      };
      if (idUser && stateClass && !idExtension && !idTypeClass) {
        queryC += `c.idUser = ${idUser} `;
        queryDataC.idUser = idUser;
      } else if (!idUser && stateClass && idExtension && !idTypeClass) {
        queryC += `u.idExtension = ${idExtension} `;
        queryDataC.idExtension = idExtension;
      } else if (!idUser && stateClass && !idExtension && idTypeClass) {
        queryC += `c.idTypeClass = ${idTypeClass} `;
        queryDataC.idTypeClass = idTypeClass;
      }

      queryC += `AND c.stateClass = ${stateClass} AND c.idTypeClass = t.idTypeClass AND c.idHours = h.idHours AND c.idUser = u.idUser AND  u.idExtension = e.idExtension ORDER BY c.idClass ${order}`;

      const [dataC] = await pool.query(queryC);
      if (!dataC.length) throw Error(`No se encontro nada`);

      return responseData(dataC, "filter", page, queryDataC);

    default:
      break;
  }
};

const filterAll = async (option) => {
  let queryFilter = "";
  if (
    option === "typeClass" ||
    option === "hours" ||
    option === "class" ||
    option === "student"
  ) {
    let data = [];
    switch (option) {
      case "typeClass":
        queryFilter += " SELECT * FROM typeClass ORDER BY idTypeClass ASC";
        [data] = await pool.query(queryFilter);
        if (!data.length) throw Error(`No se encontro nada`);
        return data;
      case "hours":
        queryFilter +=
          "SELECT * FROM hours WHERE stateHours = TRUE ORDER BY idHours ASC";
        [data] = await pool.query(queryFilter);
        if (!data.length) throw Error(`No se encontro nada`);
        return data;
      case "class":
        queryFilter +=
          "SELECT * FROM class WHERE stateClass = true ORDER BY idClass ASC";
        [data] = await pool.query(queryFilter);
        if (!data.length) throw Error(`No se encontro nada`);
        return data;
      case "student":
        [data] = await pool.query(
          `SELECT u.idUser, u.nameUser, u.lastNameUser, u.carnetUser, e.department, u.photoUser FROM user u, level l, extension e WHERE u.idLevel = l.idLevel AND u.stateUser = TRUE AND e.idExtension = u.idExtension AND l.nameLevel = "Estudiante"`
        );
        if (!data.length) throw Error(`No se encontro nada`);
        return data;
    }
  } else {
    queryFilter +=
      "SELECT u.idUser, l.nameLevel, u.nameUser, u.lastNameUser, u.carnetUser, e.department, u.photoUser FROM user u, level l, extension e";

    if (option === "student") {
      queryFilter += ` WHERE u.idLevel = 4 `;
    }

    if (option === "teacher") {
      queryFilter += ` WHERE u.idLevel = 2 `;
    }

    queryFilter +=
      "AND u.stateUser = true AND u.idLevel = l.idLevel AND u.idExtension = e.idExtension ORDER BY u.idUser";
    const [responseAll] = await pool.query(queryFilter);
    if (!responseAll.length) throw Error(`No se encontro nada`);
    return responseAll;
  }
};

const getInfoIdUser = async (idUser) => {
  const { nameLevel } = await getIdUser(idUser);
  if (nameLevel === "Estudiante" || nameLevel === "Secretaria") {
    throw Error(`Lo siento usted no tiene permiso para acceder`);
  }
  let query =
    "SELECT c.idClass, c.idHours, c.idTypeClass, t.nameClass, c.parallel, h.totalTime,  c.stateClass FROM class c, user u, typeClass t, hours h WHERE u.idUser = c.idUser AND t.idTypeClass = c.idTypeClass AND h.idHours = c.idHours AND c.stateClass = true ";
  if (nameLevel === "Director") {
    const [data] = await pool.query(query);
    if (!data.length) {
      throw Error`No se encontraron clases`;
    }
    return data;
  } else if (nameLevel === "Profesor") {
    query += `AND c.idUser = ${idUser}`;
    const [data] = await pool.query(query);
    if (!data.length) {
      throw Error`No se encontraron clases`;
    }
    return data;
  }
};

// ************************************************************************************ //
const sendFilter = async (flag, from, to, stateContact, page) => {   
  const [data] = await pool.query(
    `SELECT * FROM sendContact WHERE dateContact BETWEEN ? AND ? AND stateContact = ${stateContact} ORDER BY dateContact DESC`,
    [from, to]
  );
  const queryData = { from, to, stateContact }; 
  return responseFilterData(flag, data, page, queryData);
};

module.exports = { filterUser, filterAll, getInfoIdUser, sendFilter };