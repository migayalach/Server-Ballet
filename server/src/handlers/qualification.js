const postQualification = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getQualificationAll = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getQualificationId = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putQualification = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteQualification = (request, response) => {
  try {
    const data = 1;
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postQualification,
  getQualificationAll,
  getQualificationId,
  putQualification,
  deleteQualification,
};
