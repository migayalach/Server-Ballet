const {
  createStudent,
  getAllStudent,
  getPageStudent,
  getIdStudent,
  updateStudent,
  removeStudent,
} = require("../controllers/studentController");

const getStudentAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllStudent() : await getPageStudent(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getStudentId = async (request, response) => {
  const { idStudent } = request.params;
  try {
    const data = await getIdStudent(idStudent);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const postStudent = async (request, response) => {
  const {
    idExtension,
    nameStudent,
    lastNameStudent,
    emailStudent,
    carnetStudent,
    addressStudent,
    dateBirthStudent,
    photoStudent,
  } = request.body;
  try {
    const data = await createStudent(
      idExtension,
      nameStudent,
      lastNameStudent,
      emailStudent,
      carnetStudent,
      addressStudent,
      dateBirthStudent,
      photoStudent
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putStudent = async (request, response) => {
  const {
    idStudent,
    idExtension,
    nameStudent,
    lastNameStudent,
    emailStudent,
    carnetStudent,
    addressStudent,
    dateBirthStudent,
    stateStudent,
  } = request.body;
  try {
    const data = await updateStudent(
      idStudent,
      idExtension,
      nameStudent,
      lastNameStudent,
      emailStudent,
      +carnetStudent,
      addressStudent,
      dateBirthStudent,
      stateStudent
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (request, response) => {
  const { idStudent } = request.params;
  try {
    const data = await removeStudent(idStudent);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postStudent,
  getStudentAll,
  getStudentId,
  putStudent,
  deleteStudent,
};
