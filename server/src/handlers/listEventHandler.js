const {
  createListEvent,
  getAllListEvent,
  getPageListEvent,
  getIdListEvent,
  updateListEvent,
} = require("../controllers/listEventController");

// TODO: CREAR UN NUEVO EVENTO UTILIZANDO 'hour, dateNews, title, body, urlPicture' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postListEvent = async (request, response) => {
  const { hour, dateNews, title, body, urlPicture } = request.body;
  try {
    const data = await createListEvent(hour, dateNews, title, body, urlPicture);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE EVENTOS O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getListEventAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllListEvent() : await getPageListEvent(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR EL EVENTO BUSCADO POR 'idListEvent' EN LOS PARÁMETROS DE LA RUTA
const getListEvent = async (request, response) => {
  const { idListEvent } = request.params;
  try {
    const data = await getIdListEvent(idListEvent);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UN EVENTO UTILIZANDO 'idListEvent, hour, dateNews, title, body, stateEvent, urlPicture,' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putListEvent = async (request, response) => {
  const { idListEvent, hour, dateNews, title, body, stateEvent, urlPicture } =
    request.body;

  try {
    const data = await updateListEvent(
      idListEvent,
      hour,
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
