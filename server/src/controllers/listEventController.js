const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");

const createListEvent = async (dateNews, body, urlPicture) => {
  await pool.query(
    `INSERT INTO listEvents (dateNews, body, urlPicture) VALUES (?, ?, ?)`,
    [dateNews, body, urlPicture]
  );
  return await getAllListEvent();
};

const getAllListEvent = async () => {
  const [data] = await pool.query(
    `SELECT * FROM listEvents ORDER BY dateNews DESC`
  );
  if (!data.length) {
    throw Error(`Lo siento no hay eventos programados`);
  }
  return responseData(data, "list", (page = 1));
};

const getPageListEvent = async (page) => {
  throw Error(`Lo siento no hay eventos programados`);

  return `${page}`;
};

const getIdListEvent = async (idListEvent) => {
  const [data] = await pool.query(
    `SELECT * FROM listEvents WHERE idListEvent = ?`,
    [idListEvent]
  );
  return data;
};

const updateListEvent = async (idListEvent, dateNews, body, urlPicture) => {
  return `${idListEvent} - ${dateNews} - ${body} - ${urlPicture} `;
};

const removeListEvent = async (idListEvent) => {
  console.log(idListEvent);
  return `${idListEvent}`;
};

module.exports = {
  createListEvent,
  getAllListEvent,
  getPageListEvent,
  getIdListEvent,
  updateListEvent,
  removeListEvent,
};
