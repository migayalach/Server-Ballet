const {
  createLevel,
  getAllLevel,
  getPageLevel,
  getIdLevel,
  updateLevel,
  removeLevel,
} = require("../controllers/levelController");

// TODO: CREAR UN NUEVO NIVEL UTILIZANDO 'nameLevel' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postLevel = async (request, response) => {
  const { nameLevel } = request.body;
  try {
    const data = await createLevel(nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE NIVELES O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getLevelAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllLevel() : await getPageLevel(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR EL NIVEL BUSCADO POR 'idLevel' EN LOS PARÁMETROS DE LA RUTA
const getLevelId = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await getIdLevel(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UN NIVEL UTILIZANDO 'idLevel, nameLevel' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putLevel = async (request, response) => {
  const { idLevel, nameLevel } = request.body;
  try {
    const data = await updateLevel(idLevel, nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA EL NIVEL BUSCADO POR 'idLevel' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteLevel = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await removeLevel(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postLevel,
  getLevelAll,
  getLevelId,
  putLevel,
  deleteLevel,
};
