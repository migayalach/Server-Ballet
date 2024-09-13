const {
  getAllExtension,
  getPageExtension,
  createExtension,
  updateExtension,
  removeExtension,
} = require("../controllers/extensionController");

// TODO: RETORNA LA LISTA COMPLETA DE EXTENSIONES O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getExtensionAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllExtension() : await getPageExtension(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: CREAR UNA NUEVA EXTENSION UTILIZANDO 'nameExtension' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postExtension = async (request, response) => {
  const { nameExtension } = request.body;
  try {
    const data = await createExtension(nameExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UNA EXTENSION UTILIZANDO 'idExtension, nameExtension' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putExtension = async (request, response) => {
  const { idExtension, nameExtension } = request.body;
  try {
    const data = await updateExtension(idExtension, nameExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA LA EXTENSION BUSCADO POR 'idExtension' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteExtension = async (request, response) => {
  const { idExtension } = request.params;
  try {
    const data = await removeExtension(idExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postExtension,
  getExtensionAll,
  putExtension,
  deleteExtension,
};
