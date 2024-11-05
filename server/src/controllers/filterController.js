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
      const [hours] = await pool.query(
        `SELECT * FROM hours ORDER BY totalTime ${data.order}`
      );
      return hours;

    case "user":
      let query = `SELECT s.idUser, s.idLevel, l.nameLevel, s.idExtension, e.department, s.nameUser,  s.lastNameUser,  s.emailUser,  s.addressUser, s.dateBirthUser,  s.carnetUser, s.numberPhone, s.photoUser,  s.stateUser FROM user s, extension e, level l WHERE s.idExtension = e.idExtension AND s.idLevel = l.idLevel`;
      if (data.nameLevel) {
        query += ` AND l.nameLevel = "${data.nameLevel}"`;
      }
      if (data.stateUser) {
        query += ` AND stateUser = ${data.stateUser}`;
      }

      if (data.nameUser && !data.lastName) {
        query += ` ORDER BY nameUser ${data.order}`;
      } else if (data.lastName && !data.nameUser) {
        query += ` ORDER BY lastNameUser ${data.order}`;
      }

      const [user] = await pool.query(query);
      return user;

    case "userInfo":
      return;

    case "class":
      const [claSs] = await pool.query(``);
      return claSs;

    default:
      break;
  }
};

const filterData = async (search, data, page) => {
  const response = await dataSearh(search, data);
  return responseFilter(response, search, data, page);
};

module.exports = { filterData };
