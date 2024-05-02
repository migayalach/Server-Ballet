const {
  createClass,
  getAllClass,
  getPageClass,
  updateClass,
  removeClass,
} = require("../controllers/classController");

const postClass = async (request, response) => {
  const { idHours, idUser, idTypeClass, parallel } = request.body;
  try {
    const data = await createClass(idHours, idUser, idTypeClass, parallel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getClassAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllClass() : await getPageClass(page);
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
  const { idClass } = request.params;
  try {
    const data = await removeClass(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postClass,
  getClassAll,
  putClass,
  deleteClass,
};
