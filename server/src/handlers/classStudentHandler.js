const {
  createClassStudent,
  getPageClassStudent,
  getIdClassStudent,
  removeClassStudent,
  updateClassStudent,
} = require("../controllers/classStudentController");

// TODO: RETORNA LA LISTA COMPLETA DE ESTUDIANTES Y EL PAGINADO, SE NECESITAN 'idClass  y page'
const getClassStudentAll = async (request, response) => {
  const { idClass, page } = request.query;
  try {
    const data = await getPageClassStudent(idClass, page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR LA LISTA DE ALUMNOS BUSCADO POR 'idClass' EN LOS PARÁMETROS DE LA RUTA
const getClassStudentId = async (request, response) => {
  const { idClass } = request.params;
  try {
    const data = await getIdClassStudent(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: INSCRIBE UN NUEVO ALUMNO A UNA CLASE UTLIZANDO 'idClass, idUser' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postClassStudent = async (request, response) => {
  const { idClass, idUser } = request.body;
  try {
    const data = await createClassStudent(idClass, idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA UN ALUMNO DE LA CLASE  BUSCADO POR 'idClass, idUser' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
const deleteClassStudent = async (request, response) => {
  const { idClass, idUser } = request.params;
  try {
    const data = await removeClassStudent(idClass, idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putClassStudent = async (request, response) => {
  const { idClass, idUser, state } = request.body;
  try {
    const data = await updateClassStudent(idClass, idUser, state);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  getClassStudentAll,
  getClassStudentId,
  postClassStudent,
  deleteClassStudent,
  putClassStudent,
};
