const {
  createUser,
  getAllUser,
  getPageUser,
  getIdUser,
  updateUser,
  removeUser,
} = require("../controllers/userController");

const postUser = async (request, response) => {
  const {
    idLevel,
    idExtension,
    nameUser,
    lastNameUser,
    emailUser,
    addressUser,
    dateBirthUser,
    carnetUser,
    photoUser,
  } = request.body;
  try {
    const data = await createUser(
      idLevel,
      idExtension,
      nameUser,
      lastNameUser,
      emailUser,
      addressUser,
      dateBirthUser,
      +carnetUser,
      photoUser
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getUserAllOrPage = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllUser() : await getPageUser(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getUserId = async (request, response) => {
  const { idUser } = request.params;
  try {
    const data = await getIdUser(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putUser = async (request, response) => {
  const {
    idUser,
    idLevel,
    idExtension,
    nameUser,
    lastNameUser,
    emailUser,
    addressUser,
    dateBirthUser,
    carnetUser,
    stateUser,
  } = request.body;
  try {
    const data = await updateUser(
      idUser,
      idLevel,
      idExtension,
      nameUser,
      lastNameUser,
      emailUser,
      addressUser,
      dateBirthUser,
      +carnetUser,
      stateUser
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteUser = async (request, response) => {
  const { idUser } = request.params;
  try {
    const data = await removeUser(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postUser,
  getUserAllOrPage,
  getUserId,
  putUser,
  deleteUser,
};
