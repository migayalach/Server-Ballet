const {
  getAllExtension,
  getPageExtension,
  createExtension,
  updateExtension,
  removeExtension,
} = require("../controllers/extensionController");

const postExtension = (request, response) => {
  const { nameExtension } = request.body;
  try {
    const data = createExtension(nameExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getExtensionAll = (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? getAllExtension() : getPageExtension(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putExtension = (request, response) => {
  const { idExtension, nameExtension } = request.body;
  try {
    const data = updateExtension(idExtension, nameExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteExtension = (request, response) => {
  const { idExtension } = request.params;
  try {
    const data = removeExtension(idExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postExtension,
  getExtensionAll,
  putExtension,
  deleteExtension,
};
