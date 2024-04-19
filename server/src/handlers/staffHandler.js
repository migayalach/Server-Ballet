const {
  createStaff,
  getAllStaff,
  getPageStaff,
  getIdStaff,
  updateStaff,
  removeStaff,
} = require("../controllers/staffController");

const postStaff = async (request, response) => {
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
    const data = await createStaff(
      idLevel,
      idExtension,
      nameStaff,
      lastNameStaff,
      emailStaff,
      addressStaff,
      dateBirthStaff,
      +carnetStaff,
      photoStaff
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getStaffAllOrPage = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllStaff() : await getPageStaff(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getStaffId = async (request, response) => {
  const { idStaff } = request.params;
  try {
    const data = await getIdStaff(idStaff);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putStaff = async (request, response) => {
  const {
    idStaff,
    idLevel,
    idExtension,
    nameStaff,
    lastNameStaff,
    emailStaff,
    passwordStaff,
    addressStaff,
    dateBirthStaff,
    carnetStaff,
    photoStaff,
    stateStaff,
  } = request.body;
  try {
    const data = await updateStaff(
      idStaff,
      idLevel,
      idExtension,
      nameStaff,
      lastNameStaff,
      emailStaff,
      passwordStaff,
      addressStaff,
      dateBirthStaff,
      carnetStaff,
      photoStaff,
      stateStaff
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteStaff = async (request, response) => {
  const { idStaff } = request.params;
  try {
    const data = await removeStaff(idStaff);
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
