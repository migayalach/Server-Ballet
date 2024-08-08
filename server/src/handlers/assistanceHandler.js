const {
  createNewAssistance,
  getAllIdClassLiss,
  getPageAssistance,
  updateDateAssistance,
  removeAssistance,
} = require("../controllers/assistanceController");

const postNewAssistance = async (request, response) => {
  const { idClass, dateAssistance } = request.body;
  try {
    const data = await createNewAssistance(idClass, dateAssistance);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAssistanceIdClass = async (request, response) => {
  const { idClass } = request.params;
  try {
    const data = await getAllIdClassLiss(idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAssistancePage = async (request, response) => {
  const { idClass, page } = request.query;
  try {
    const data = await getPageAssistance(idClass, page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putAssistanceId = async (request, response) => {
  const { idAssistance, idClass, dateAssistance } = request.body;
  try {
    const data = await updateDateAssistance(
      idAssistance,
      idClass,
      dateAssistance
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteAssistance = async (request, response) => {
  const { idClass, idAssistance } = request.params;
  try {
    const data = await removeAssistance(idAssistance, idClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postNewAssistance,
  getAssistanceIdClass,
  getAssistancePage,
  putAssistanceId,
  deleteAssistance,
};
