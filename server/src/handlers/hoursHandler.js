const {
  createHours,
  getAllHours,
  getPageHours,
  getIdHours,
  updateHours,
  removeHours,
} = require("../controllers/hoursController");

const postHours = async (request, response) => {
  const { nameLevel } = request.body;
  try {
    const data = await createHours(nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getHoursAllPage = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllHours() : await getPageHours(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getHoursId = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await getIdHours(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putHours = async (request, response) => {
  const { idLevel, nameLevel } = request.body;
  try {
    const data = await updateHours(idLevel, nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteHours = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const data = await removeHours(idLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postHours,
  getHoursAllPage,
  getHoursId,
  putHours,
  deleteHours,
};
