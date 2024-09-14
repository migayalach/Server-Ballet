const {
  createQualification,
  getAllQualification,
} = require("../controllers/../controllers/qualificationController");

const postQualification = async (request, response) => {
  const { idParams, idUser, arrayData } = request.body;
  try {
    const data = await createQualification(idParams, idUser, arrayData);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE CALIFICACIONES PROPORCIONANDO LOS PARAMETROS DE CONSULTA 'idParams, idUser, page'
const getQualificationAll = async (request, response) => {
  const { idParams, idUser, page } = request.query;
  const current = page === undefined ? 1 : page;
  try {
    const data = await getAllQualification(idParams, idUser, current);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  getQualificationAll,
  postQualification,
};
