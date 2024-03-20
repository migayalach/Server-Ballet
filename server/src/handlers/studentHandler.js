const {
  createStudent,
  getAllStudent,
  getPageStudent,
  getIdStudent,
  updateStudent,
  removeStudent,
} = require("../controllers/studentController");

const getStudentAll = (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? getAllStudent() : getPageStudent();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getStudentId = (request, response) => {
  const { idUser } = request.params;
  try {
    const data = getIdStudent(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const postStudent = (request, response) => {
  const {
    idLevel,
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
    const data = createStudent(
      idLevel,
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

const putStudent = (request, response) => {
  const {
    idUser,
    idLevel,
    idExtension,
    nameUser,
    emailUser,
    carnet,
    registrationNumber,
  } = request.body;
  try {
    const data = updateStudent(
      idUser,
      idLevel,
      idExtension,
      nameUser,
      emailUser,
      carnet,
      registrationNumber
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteStudent = (request, response) => {
  const { idUser } = request.params;
  try {
    const data = removeStudent(idUser);
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
