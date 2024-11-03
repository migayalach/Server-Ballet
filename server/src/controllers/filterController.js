const pool = require("../dataBase/conexion");
const { responseFilter } = require("../utils/response");

const obtainDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const dataSearh = async (search, data) => {
  switch (search) {
    case "listEvent":
      // const dateEnd = !data.dateEnd && obtainDate();
      const [info] = await pool.query(
        `SELECT l.idListEvent, l.hourEvent, l.dateNews, l.title, l.body, l.stateEvent, l.urlPicture 
        FROM listEvents l WHERE l.dateNews BETWEEN ? AND ? AND l.stateEvent = ? ORDER BY l.dateNews ${data.order}`,
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

    default:
      break;
  }
};

const filterData = async (search, data, page) => {
  const response = await dataSearh(search, data);
  return responseFilter(response, search, data, page);
};

module.exports = { filterData };
