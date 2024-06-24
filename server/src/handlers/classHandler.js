const {
  createClass,
  getAllClass,
  getByIdClass,
  getAllClassId,
  getPageClass,
  updateClass,
  removeClass,
} = require("../controllers/classController");

const getClassAll = async (request, response) => {
  const { page, idUser } = request.query;
  try {
    const data = !page
      ? await getAllClass(idUser)
      : await getPageClass(page, idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const postClass = async (request, response) => {
  const { idUserCreate, idHours, idUser, idTypeClass, parallel } = request.body;
  try {
    const data = await createClass(
      idUserCreate,
      idHours,
      idUser,
      idTypeClass,
      parallel
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdClass = async (request, response) => {
  const { idClass } = request.params;
  try {
    const data = await getByIdClass(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putClass = async (request, response) => {
  const { idClass, idHours, idUser, idTypeClass, parallel, stateClass } =
    request.body;
  try {
    const data = await updateClass(
      idClass,
      idHours,
      idUser,
      idTypeClass,
      parallel,
      stateClass
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteClass = async (request, response) => {
  const { idUser, idClass } = request.params;
  try {
    const data = await removeClass(idUser, idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postClass,
  getClassAll,
  getIdClass,
  putClass,
  deleteClass,
};
