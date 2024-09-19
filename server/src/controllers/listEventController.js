const pool = require("../dataBase/conexion");
const { existIdHours, allListEvent } = require("./controllerData");
const responseData = require("../utils/response");

const createListEvent = async (hour, dateNews, title, body, urlPicture) => {
  const [ResultSetHeader] = await pool.query(
    `INSERT INTO listEvents (hourEvent, dateNews, title, body, urlPicture) VALUES (?, ?, ?, ?, ?)`,
    [hour, dateNews, title, body, urlPicture]
  );
  const listEventData = await getIdListEvent(ResultSetHeader.insertId);
  const infoData = await getAllListEvent();
  return { listEventData, infoData, state: "create" };
};

const getAllListEvent = async () => {
  const data = await allListEvent();
  if (data.length < 1) {
    throw Error(`Lo siento no hay eventos programados`);
  }
  return responseData(data, "listEvents", (page = 1));
};

const getPageListEvent = async (page) => {
  const response = await allListEvent();
  return responseData(response, "listEvents", page);
};

const getIdListEvent = async (idListEvent) => {
  const [data] = await pool.query(
    `SELECT l.idListEvent, l.hourEvent, l.dateNews, l.title, l.body, l.stateEvent, l.urlPicture FROM listEvents l WHERE l.idListEvent = ?`,
    [idListEvent]
  );
  return data;
};

const updateListEvent = async (
  idListEvent,
  hour,
  dateNews,
  title,
  body,
  stateEvent,
  urlPicture
) => {
  if (!(await getIdListEvent(idListEvent)).length) {
    throw Error(`El evento que quieres modificar no esta registrado`);
  }
  await pool.query(
    `UPDATE listEvents SET hourEvent = ?, dateNews = ?, title = ?, body = ?, stateEvent = ?, urlPicture = ? WHERE idListEvent = ?`,
    [hour, dateNews, title, body, stateEvent, urlPicture, idListEvent]
  );
  return await getIdListEvent(idListEvent);
};

module.exports = {
  createListEvent,
  getAllListEvent,
  getPageListEvent,
  getIdListEvent,
  updateListEvent,
};
