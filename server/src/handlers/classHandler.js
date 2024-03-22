const {
  createClass,
  getAllClass,
  getIdClass,
  getPageClass,
  updateClass,
  removeClass,
} = require("../controllers/classController");

const postClass = (request, response) => {
  const { idHours, idStaff, idTypeClass, parallel } = request.body;
  try {
    const data = createClass(idHours, idStaff, idTypeClass, parallel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getClassAll = (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? getAllClass() : getPageClass(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getClassId = (request, response) => {
  const { idClass } = request.params;
  try {
    const data = getIdClass(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putClass = (request, response) => {
  const { idClass, idHours, idStaff, idTypeClass, parallel, stateClass } =
    request.body;
  try {
    const data = updateClass(
      idClass,
      idHours,
      idStaff,
      idTypeClass,
      parallel,
      stateClass
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteClass = (request, response) => {
  const { idClass } = request.params;
  try {
    const data = removeClass(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postClass,
  getClassAll,
  getClassId,
  putClass,
  deleteClass,
};
