const pool = require("../dataBase/conexion");
const { responseFilter } = require("../utils/response");

const obtainDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const dataSearh = async (search, data) => {
  switch (search) {
    case "listEvent":
      const [info] = await pool.query(
        `SELECT l.idListEvent, l.hourEvent, l.dateNews, l.title, l.body, l.stateEvent, l.urlPicture 
        FROM listEvents l WHERE l.dateNews BETWEEN ? AND ? ORDER BY l.dateNews ${data.order}`,
        [
          data.dateStart,
          !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd,
          data.state,
        ]
      );
      return info;

    case "contact":
      const [contacts] = await pool.query(
        `SELECT * FROM sendContact WHERE dateContact BETWEEN ? AND ? AND stateContact = ? ORDER BY dateContact ${data.order}`,
        [
          data.dateStart,
          !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd,
          data.state,
        ]
      );
      return contacts;

    case "typeClass":
      const [typeClass] = await pool.query(
        `SELECT * FROM typeClass ORDER BY nameClass ${data.order}`
      );
      return typeClass;

    case "hours":
      let queryHours = `SELECT * FROM hours WHERE stateHours = ${data.state}`;

      if (data.order) {
        queryHours += ` ORDER BY totalTime ${data.order}`;
      }

      const [hours] = await pool.query(queryHours);
      return hours;

    case "user":
      let query = `SELECT s.idUser, s.idLevel, l.nameLevel, s.idExtension, e.department, s.nameUser,  s.lastNameUser,  s.emailUser,  s.addressUser, s.dateBirthUser,  s.carnetUser, s.numberPhone, s.photoUser,  s.stateUser FROM user s, extension e, level l WHERE s.idExtension = e.idExtension AND s.idLevel = l.idLevel`;

      if (data.idLevel > 0) {
        query += ` AND l.idLevel = ${data.idLevel} AND s.stateUser = ${data.stateUser}`;
      }

      if (data.order) {
        if (data.nameOrLastName === "nameUser") {
          query += ` ORDER BY s.nameUser ${data.order}`;
        } else if (data.nameOrLastName === "lastNameUser") {
          query += ` ORDER BY s.lastNameUser ${data.order}`;
        } else {
          query += ` ORDER BY s.carnetUser ${data.order}`;
        }
      }

      const [user] = await pool.query(query);
      return user;

    case "userInfo":
      return;

    case "class":
      let queryClass =
        "SELECT c.idClass, h.totalTime, s.idUser, s.nameUser, s.lastNameUser, s.carnetUser, e.department, t.nameClass, c.parallel, c.stateClass FROM class c, typeClass t, user s, hours h, extension e WHERE c.idTypeClass = t.idTypeClass AND c.idHours = h.idHours AND c.idUser = s.idUser AND  s.idExtension = e.idExtension";
      if (data.idUser > 0) {
        queryClass += ` AND s.idUser = ${data.idUser}`;
      }
      if (data.idTypeClass > 0) {
        queryClass += ` AND t.idTypeClass = ${data.idTypeClass}`;
      }
      if (data.state) {
        queryClass += ` AND c.stateClass = ${data.state}`;
      }
      if (data.order) {
        queryClass += ` ORDER BY c.parallel ${data.order}`;
      }
      const [claSs] = await pool.query(queryClass);
      return claSs;

    case "assistance":
      const [assitance] = await pool.query(
        `SELECT *  FROM assistance WHERE idClass = ? AND dateAssistance BETWEEN ? AND ? ORDER BY dateAssistance ${data.order}`,
        [
          data.idClass,
          data.dateStart,
          !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd,
        ]
      );
      return assitance;

    case "qualification":
      let queryQualification = `SELECT * FROM params WHERE idClass = ${
        data.idClass
      } AND dateTest BETWEEN '${data.dateStart}' AND '${
        !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd
      }'`;
      if (data.noteFinish) {
        queryQualification += ` ORDER BY noteFinish`;
      } else {
        queryQualification += ` ORDER BY dateTest`;
      }
      queryQualification += ` ${data.order}`;

      const [qualification] = await pool.query(queryQualification);

      return qualification;

    default:
      break;
  }
};

const filterData = async (search, data, page) => {
  const response = await dataSearh(search, data);
  return responseFilter(response, search, data, page);
};

module.exports = { filterData };
