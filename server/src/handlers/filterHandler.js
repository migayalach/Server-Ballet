const { filterData } = require("../controllers/filterController");

const getFilterUser = async (request, response) => {
  const { search, data, page } = request.query;
  try {
    const dataResponse = await filterData(search, JSON.parse(data), page);
    return response.status(200).json(dataResponse);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFilterUser,
};
