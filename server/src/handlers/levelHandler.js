const postLevel = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelAll = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelId = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putLevel = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteLevel = (request, response) => {
  try {
    const data = 1;
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
