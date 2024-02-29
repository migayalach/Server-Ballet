const postClass = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getClassAll = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getClassId = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putClass = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteClass = (request, response) => {
  try {
    const data = 1;
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
