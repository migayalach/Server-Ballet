const {
  createParams,
  getPageParams,
  getIdParams,
  updateParams,
  removeParams,
  getIdParamsInfo,
} = require("../controllers/paramsController");

// TODO: CREAR UNA NUEVA EVALUACION UTILIZANDO 'idUser, idClass, dateTest, title, params' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postParams = async (request, response) => {
  const { idClass, dateTest, title, params } = request.body;
  try {
    const data = await createParams(idClass, dateTest, title, params);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR TODAS LAS EVALUACIONES BUSCADAS POR 'idUser' EN LOS PARÁMETROS DE LA RUTA
const getParamsId = async (request, response) => {
  const { idClass, idParams } = request.params;
  try {
    const data = idParams
      ? await getIdParamsInfo(idParams)
      : await getIdParams(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UNA EVALUACION UTILIZANDO 'idParams, idClass, dateTest, title, params' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putParams = async (request, response) => {
  const { idParams, idClass, dateTest, title, params } = request.body;
  try {
    const data = await updateParams(idParams, idClass, dateTest, title, params);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE EVALUACIONES O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'idClass, page'
const getParamsAllPage = async (request, response) => {
  const { idClass, page } = request.query;
  try {
    const data = await getPageParams(idClass, page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA LA EVALUACION BUSCADA POR 'idUser, idParams' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteParams = async (request, response) => {
  const { idClass, idParams } = request.params;
  try {
    const data = await removeParams(idClass, idParams);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postParams,
  getParamsId,
  putParams,
  deleteParams,
  getParamsAllPage,
};
