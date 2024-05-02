const {
  createClassStudent,
  getPageClassStudent,
  getIdClassStudent,
  removeClassStudent,
  updateStudent,
} = require("../controllers/classStudentController");

const getClassStudentAll = async (request, response) => {
  const { idClass, page } = request.query;
  try {
    const data = await getPageClassStudent(idClass, page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getClassStudentId = async (request, response) => {
  const { idClass } = request.params;
  try {
    const data = await getIdClassStudent(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const postClassStudent = async (request, response) => {
  const { idClass, idUser } = request.body;
  try {
    const data = await createClassStudent(idClass, idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteClassStudent = async (request, response) => {
  const { idClass, idUser } = request.params;
  try {
    const data = await removeClassStudent(idClass, idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// const putStudent = async (request, response) => {
//   // const {
//   //   idStudent,
//   //   idExtension,
//   //   nameStudent,
//   //   lastNameStudent,
//   //   emailStudent,
//   //   carnetStudent,
//   //   addressStudent,
//   //   dateBirthStudent,
//   //   stateStudent,
//   // } = request.body;
//   // try {
//   //   const data = await updateStudent(
//   //     idStudent,
//   //     idExtension,
//   //     nameStudent,
//   //     lastNameStudent,
//   //     emailStudent,
//   //     +carnetStudent,
//   //     addressStudent,
//   //     dateBirthStudent,
//   //     stateStudent
//   //   );
//   //   response.status(200).json(data);
//   // } catch (error) {
//   //   response.status(400).json({ error: error.message });
//   // }
// };

module.exports = {
  getClassStudentAll,
  getClassStudentId,
  postClassStudent,
  deleteClassStudent,
  // putStudent,
};
