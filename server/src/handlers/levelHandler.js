const {
  createLevel,
  getAllLevel,
  getPageLevel,
  getIdLevel,
  updateLevel,
  removeLevel,
} = require("../controllers/levelController");

const postLevel = async (request, response) => {
  const { nameLevel } = request.body;
  try {
    const data = await createLevel(nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelAll = (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? getAllLevel() : getPageLevel(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelId = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await getIdLevel(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putLevel = async (request, response) => {
  const { idLevel, nameLevel } = request.body;
  try {
    const data = await updateLevel(idLevel, nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteLevel = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await removeLevel(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postLevel,
  getLevelAll,
  getLevelId,
  putLevel,
  deleteLevel,
};
