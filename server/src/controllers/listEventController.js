const pool = require("../dataBase/conexion");
const { existIdHours, allListEvent } = require("./controllerData");
const responseData = require("../utils/response");

const createListEvent = async (idHours, dateNews, title, body, urlPicture) => {
  if (!(await existIdHours(idHours))) {
    throw Error(`No se encuentro la hora seleccionada`);
  }
  const [ResultSetHeader] = await pool.query(
    `INSERT INTO listEvents (idHours, dateNews, title, body, urlPicture) VALUES (?, ?, ?, ?, ?)`,
    [idHours, dateNews, title, body, urlPicture]
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
    `SELECT l.idListEvent, l.idHours, l.dateNews, l.title, l.body, h.startTime, h.endTime, l.stateEvent, l.urlPicture FROM listEvents l, hours h WHERE l.idHours = h.idHours AND l.idListEvent = ?`,
    [idListEvent]
  );
  return data;
};

const updateListEvent = async (
  idListEvent,
  idHours,
  dateNews,
  title,
  body,
  stateEvent,
  urlPicture
) => {
  if (!(await existIdHours(idHours))) {
    throw Error(`No se encuentro la hora seleccionada`);
  }
  await pool.query(
    `UPDATE listEvents SET idHours= ?, dateNews = ?, title = ?, body = ?, stateEvent = ?, urlPicture = ? WHERE idListEvent = ?`,
    [idHours, dateNews, title, body, stateEvent, urlPicture, idListEvent]
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
