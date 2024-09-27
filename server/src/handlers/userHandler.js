const {
  createUser,
  getAllUser,
  getPageUser,
  getIdUser,
  updateUser,
  removeUser,
} = require("../controllers/userController");

// TODO: CREAR UN NUEVO USUARIO UTILIZANDO 'idLevel, idExtension, nameUser, lastNameUser, emailUser, addressUser, dateBirthUser, carnetUser, photoUser' PROPORCIONADO POR EL BODY DE LA SOLICITUD
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
    numberPhone,
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
      +numberPhone,
      photoUser
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE USUARIOS O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getUserAllOrPage = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllUser() : await getPageUser(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR EL USUARIO BUSCADO POR 'idUser' EN LOS PARÁMETROS DE LA RUTA
const getUserId = async (request, response) => {
  const { idUser } = request.params;
  try {
    const data = await getIdUser(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UN USUARIO UTILIZANDO 'idUser, idLevel, idExtension, nameUser, lastNameUser, emailUser, passwordUser, addressUser, dateBirthUser, carnetUser, stateUser' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const putUser = async (request, response) => {
  const {
    idUser,
    idLevel,
    idExtension,
    nameUser,
    lastNameUser,
    emailUser,
    passwordUser,
    addressUser,
    dateBirthUser,
    carnetUser,
    numberPhone,
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
      passwordUser,
      addressUser,
      dateBirthUser,
      +carnetUser,
      +numberPhone,
      stateUser
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: ELIMINA EL USUARIO BUSCADO POR 'idUser' PROPORCIONADO POR EL PARÁMETRO DE LA RUTA
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
