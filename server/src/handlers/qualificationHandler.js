const {
  createQualification,
  getAllStaff,
  getIdQualificationAll
} = require("../controllers/../controllers/qualificationController");

const postQualification = async (request, response) => {
  // const { idClass, idStudent, notes, average } = request.body;
  // try {
  //   const data = await createQualification(idClass, idStudent, notes, average);
  //   response.status(200).json(data);
  // } catch (error) {
  //   response.status(400).json({ error: error.message });
  // }
};

const getQualificationAll = async (request, response) => {
  // try {
  //   const data = await getAllStaff();
  //   response.status(200).json(data);
  // } catch (error) {
  //   response.status(400).json({ error: error.message });
  // }
};

const getQualificationId = async (request, response) => {
  const { idUser } = request.params;
  try {
    const data = await getIdQualificationAll(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putQualification = (request, response) => {
  // try {
  //   const data = 1;
  //   response.status(200).json(data);
  // } catch (error) {
  //   response.status(400).json({ error: error.message });
  // }
};

const deleteQualification = (request, response) => {
  // try {
  //   const data = 1;
  //   response.status(200).json(data);
  // } catch (error) {
  //   response.status(400).json({ error: error.message });
  // }
};

module.exports = {
  postQualification,
  getQualificationAll,
  getQualificationId,
  putQualification,
  deleteQualification,
};
