const {
  createListEvent,
  getAllListEvent,
  getPageListEvent,
  getIdListEvent,
  updateListEvent,
} = require("../controllers/listEventController");

const postListEvent = async (request, response) => {
  const { idHours, dateNews, title, body, urlPicture } = request.body;
  try {
    const data = await createListEvent(
      idHours,
      dateNews,
      title,
      body,
      urlPicture
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getListEventAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllListEvent() : await getPageListEvent(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getListEvent = async (request, response) => {
  const { idListEvent } = request.params;
  try {
    const data = await getIdListEvent(idListEvent);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putListEvent = async (request, response) => {
  const {
    idListEvent,
    idHours,
    dateNews,
    title,
    body,
    stateEvent,
    urlPicture,
  } = request.body;

  try {
    const data = await updateListEvent(
      idListEvent,
      idHours,
      dateNews,
      title,
      body,
      stateEvent,
      urlPicture
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postListEvent,
  getListEventAll,
  getListEvent,
  putListEvent,
};
