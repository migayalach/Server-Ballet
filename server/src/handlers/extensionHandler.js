const {
  getAllExtension,
  getPageExtension,
  createExtension,
  updateExtension,
  removeExtension,
} = require("../controllers/extensionController");

const postExtension = async (request, response) => {
  const { nameExtension } = request.body;
  try {
    const data = await createExtension(nameExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getExtensionAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllExtension() : await getPageExtension(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putExtension = async (request, response) => {
  const { idExtension, nameExtension } = request.body;
  try {
    const data = await updateExtension(idExtension, nameExtension);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteExtension = async (request, response) => {
  const { idExtension } = request.params;
  try {
    const data = await removeExtension(idExtension);
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
