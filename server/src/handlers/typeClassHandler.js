const {
  createTypeClass,
  getAllTypeClass,
  getPageTypeClass,
  getIdTypeClass,
  updateTypeClass,
  removeTypeClass,
} = require("../controllers/typeClassController");

const postTypeClass = async (request, response) => {
  const { nameClass, description } = request.body;
  try {
    const data = await createTypeClass(nameClass, description);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getTypeClassAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllTypeClass() : await getPageTypeClass(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getTypeClassId = async (request, response) => {
  const { idTypeClass } = request.params;
  try {
    const data = await getIdTypeClass(idTypeClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putTypeClass = async (request, response) => {
  const { idTypeClass, nameClass, description } = request.body;
  try {
    const data = await updateTypeClass(idTypeClass, nameClass, description);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteTypeClass = async (request, response) => {
  const { idTypeClass } = request.params;
  try {
    const data = await removeTypeClass(idTypeClass);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postTypeClass,
  getTypeClassAll,
  getTypeClassId,
  putTypeClass,
  deleteTypeClass,
};
