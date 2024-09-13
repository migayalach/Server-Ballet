const {
  createHours,
  getAllHours,
  getPageHours,
  getIdHours,
  updateHours,
  removeHours,
} = require("../controllers/hoursController");

// TODO: CREAR UNA NUEVA HORA UTILIZANDO 'startTime, endTime, totalTime' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postHours = async (request, response) => {
  const { startTime, endTime, totalTime } = request.body;
  try {
    const data = await createHours(startTime, endTime, totalTime);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE LAS HORAS O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getHoursAllPage = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllHours() : await getPageHours(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR LA HORA BUSCADA POR 'idHours' EN LOS PARÁMETROS DE LA RUTA
const getHoursId = async (request, response) => {
  const { idHours } = request.params;
  try {
    const data = await getIdHours(idHours);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UNA HORA UTILIZANDO 'idHours, startTime, endTime, totalTime, stateHours' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putHours = async (request, response) => {
  const { idHours, startTime, endTime, totalTime, stateHours } = request.body;
  try {
    const data = await updateHours(
      idHours,
      startTime,
      endTime,
      totalTime,
      stateHours
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA LA HORA BUSCADA POR 'idHours' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteHours = async (request, response) => {
  const { idHours } = request.params;
  try {
    const data = await removeHours(idHours);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postHours,
  getHoursAllPage,
  getHoursId,
  putHours,
  deleteHours,
};
