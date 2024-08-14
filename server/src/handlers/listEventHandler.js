const {
  createListEvent,
  getAllListEvent,
  getPageListEvent,
  getIdListEvent,
  updateListEvent,
  removeListEvent,
} = require("../controllers/listEventController");
  
const postListEvent = async (request, response) => {
  const { dateNews, body, urlPicture } = request.body;
  try {
    const data = await createListEvent(dateNews, body, urlPicture);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO FILTROS POR FECHA
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
  const { idListEvent, dateNews, body, urlPicture } = request.body;
  try {
    const data = await updateListEvent(idListEvent, dateNews, body, urlPicture);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteListEvent = async (request, response) => {
  const { idListEvent } = request.params;
  try {
    const data = await removeListEvent(idListEvent);
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
  deleteListEvent,
};
