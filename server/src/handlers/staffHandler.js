const {
  createStaff,
  getAllStaff,
  getPageStaff,
  getIdStaff,
  updateStaff,
  removeStaff,
} = require("../controllers/staffController");

const postStaff = (request, response) => {
  const {
    idLevel,
    idExtension,
    nameStaff,
    lastNameStaff,
    emailStaff,
    addressStaff,
    dateBirthStaff,
    carnetStaff,
    photoStaff,
  } = request.body;
  try {
    const data = createStaff(
      idLevel,
      idExtension,
      nameStaff,
      lastNameStaff,
      emailStaff,
      addressStaff,
      dateBirthStaff,
      carnetStaff,
      photoStaff
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getStaffAllOrPage = (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? getAllStaff() : getPageStaff(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getStaffId = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await getIdStaff(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putStaff = async (request, response) => {
  const { idLevel, nameLevel } = request.body;
  try {
    const data = await updateStaff(idLevel, nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteStaff = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await removeStaff(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postStaff,
  getStaffAllOrPage,
  getStaffId,
  putStaff,
  deleteStaff,
};
