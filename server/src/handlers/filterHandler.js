const { filterUser } = require("../controllers/filterController");

const getFilterUser = async (request, response) => {
  const {
    search,
    order,
    nameOrLastName,
    idLevel,
    idExtension,
    stateUser,
    stateOrTime,
    stateHours,
    page,
  } = request.query;
  try {
    const data = await filterUser(
      search,
      order,
      nameOrLastName,
      idLevel,
      idExtension,
      stateUser,
      stateOrTime,
      page
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFilterUser,
};
