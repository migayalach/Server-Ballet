const {
  createTypeClass,
  getAllTypeClass,
  getPageTypeClass,
  getIdTypeClass,
  updateTypeClass,
  removeTypeClass,
} = require("../controllers/typeClassController");

// TODO: CREAR UN NUEVO TIPO DE CLASE UTILIZANDO 'nameClass, description' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postTypeClass = async (request, response) => {
  const { nameClass, description } = request.body;
  try {
    const data = await createTypeClass(nameClass, description);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE LOS TIPOS DE CLASE O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getTypeClassAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllTypeClass() : await getPageTypeClass(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR EL TIPO DE CLASE BUSCADA POR 'idTypeClass' EN LOS PARÁMETROS DE LA RUTA
const getTypeClassId = async (request, response) => {
  const { idTypeClass } = request.params;
  try {
    const data = await getIdTypeClass(idTypeClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UN TIPO DE CLASE UTILIZANDO 'idTypeClass, nameClass, description' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putTypeClass = async (request, response) => {
  const { idTypeClass, nameClass, description } = request.body;
  try {
    const data = await updateTypeClass(idTypeClass, nameClass, description);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA EL TIPO DE CLASE BUSCADO POR 'idTypeClass' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteTypeClass = async (request, response) => {
  const { idTypeClass } = request.params;
  try {
    const data = await removeTypeClass(idTypeClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postTypeClass,
  getTypeClassAll,
  getTypeClassId,
  putTypeClass,
  deleteTypeClass,
};
