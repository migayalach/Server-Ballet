const {
  filterUser,
  filterAll,
  getInfoIdUser,
  sendFilter,
} = require("../controllers/filterController");

const getFilterUser = async (request, response) => {
  const {
    all,
    search,
    order,
    nameOrLastName,
    idLevel,
    idExtension,
    stateUser,
    totalTime,
    stateHours,
    idUser,
    idTypeClass,
    stateClass,
    flag,
    from,
    to,
    stateContact,
    page,
  } = request.query;
  try {
    switch (flag) {
      case "send":
        const data = await sendFilter(flag, from, to, stateContact, page);
        return response.status(200).json(data);

      default:
        break;
    }

    // const data = !all
    //   ? await filterUser(
    //       all,
    //       search,
    //       order,
    //       nameOrLastName,
    //       idLevel,
    //       idExtension,
    //       stateUser,
    //       totalTime,
    //       stateHours,
    //       idUser,
    //       idTypeClass,
    //       stateClass,
    //       page
    //     )
    //   : await filterAll(all);
    // response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdUserData = async (request, response) => {
  const { idUser } = request.params;
  try {
    const data = await getInfoIdUser(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFilterUser,
  getIdUserData,
};
