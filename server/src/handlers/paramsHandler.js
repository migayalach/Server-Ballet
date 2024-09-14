const {
  createParams,
  getPageParams,
  getIdParams,
  updateParams,
  removeParams,
} = require("../controllers/paramsController");

// TODO: CREAR UNA NUEVA EVALUACION UTILIZANDO 'idUser, idClass, dateTest, title, params' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postParams = async (request, response) => {
  const { idUser, idClass, dateTest, title, params } = request.body;
  try {
    const data = await createParams(idUser, idClass, dateTest, title, params);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR TODAS LAS EVALUACIONES BUSCADAS POR 'idUser' EN LOS PARÁMETROS DE LA RUTA
const getParamsId = async (request, response) => {
  const { idUser } = request.params;
  try {
    const data = await getIdParams(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UNA EVALUACION UTILIZANDO 'idParams, idUser, idClass, dateTest, title, params' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putParams = async (request, response) => {
  const { idParams, idUser, idClass, dateTest, title, params } = request.body;
  try {
    const data = await updateParams(
      idParams,
      idUser,
      idClass,
      dateTest,
      title,
      params
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE EVALUACIONES O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'idUser, page'
const getParamsAllPage = async (request, response) => {
  const { idUser, page } = request.query;
  try {
    const data = await getPageParams(idUser, page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA LA EVALUACION BUSCADA POR 'idUser, idParams' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteParams = async (request, response) => {
  const { idUser, idParams } = request.params;
  try {
    const data = await removeParams(idUser, idParams);
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
