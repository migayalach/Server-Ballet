const {
  createUser,
  getAllUser,
  getIdUser,
  updateUser,
  removeUser,
} = require("../controllers/userController");

const getUserAll = (request, response) => {
  try {
    const data = getAllUser();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getUserId = (request, response) => {
  const { idUser } = request.params;
  try {
    const data = getIdUser(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const postUser = (request, response) => {
  const {
    idLevel,
    nameUser,
    emailUser,
    carnet,
    extension,
    registrationNumber,
  } = request.body;
  try {
    const data = createUser(
      idLevel,
      nameUser,
      emailUser,
      carnet,
      extension,
      registrationNumber
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putUser = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteUser = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postUser,
  getUserAll,
  getUserId,
  putUser,
  deleteUser,
};
