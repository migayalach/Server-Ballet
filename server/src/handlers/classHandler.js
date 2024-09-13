const {
  createClass,
  getAllClass,
  getByIdClass,
  getPageClass,
  updateClass,
  removeClass,
} = require("../controllers/classController");

// TODO: RETORNA LA LISTA COMPLETA DE CLASES O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getClassAll = async (request, response) => {
  const { page, idUser } = request.query;
  try {
    const data = !page
      ? await getAllClass(idUser)
      : await getPageClass(page, idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR LA CLASE BUSCADA POR 'idClass' EN LOS PARÁMETROS DE LA RUTA
const getIdClass = async (request, response) => {
  const { idClass } = request.params;
  try {
    const data = await getByIdClass(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: CREAR UNA NUEVA CLASE UTILIZANDO 'idUserCreate, idHours, idUser, idTypeClass, parallel' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postClass = async (request, response) => {
  const { idUserCreate, idHours, idUser, idTypeClass, parallel } = request.body;
  try {
    const data = await createClass(
      idUserCreate,
      idHours,
      idUser,
      idTypeClass,
      parallel
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UNA CLASE UTILIZANDO 'idClass, idHours, idUser, idTypeClass, parallel, stateClass' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putClass = async (request, response) => {
  const { idClass, idHours, idUser, idTypeClass, parallel, stateClass } =
    request.body;
  try {
    const data = await updateClass(
      idClass,
      idHours,
      idUser,
      idTypeClass,
      parallel,
      stateClass
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA UNA CLASE BUSCADO POR 'idUser, idClass' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteClass = async (request, response) => {
  const { idUser, idClass } = request.params;
  try {
    const data = await removeClass(idUser, idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postClass,
  getClassAll,
  getIdClass,
  putClass,
  deleteClass,
};
