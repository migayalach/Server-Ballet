const generateArchive = require("../controllers/downloadController");

const getGenerateArchive = async (request, response) => {
  const { idUser, option } = request.query; 
  try {
    const data = await generateArchive(idUser, option);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = getGenerateArchive;
