const {
  createQualification,
  getAllQualification,
  // getIdQualificationAll,
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

const getQualificationAll = async (request, response) => {
  const { idParams, idUser } = request.query;
  try {
    const data = await getAllQualification(idParams, idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// const getQualificationId = async (request, response) => {
//   const { idParams, idUser } = request.params;
//   try {
//     const data = await getIdQualificationAll(idParams, idUser);
//     response.status(200).json(data);
//   } catch (error) {
//     response.status(400).json({ error: error.message });
//   }
// };

module.exports = {
  getQualificationAll,
  postQualification,
  // getQualificationId,
};
