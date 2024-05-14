const { filterUser } = require("../controllers/filterController");

const getFilterUser = async (request, response) => {
  const { order, nameOrLastName, idLevel, idExtension, stateUser, page } =
    request.query;
  try {
    const data = await filterUser(
      order,
      nameOrLastName,
      idLevel,
      idExtension,
      stateUser,
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
