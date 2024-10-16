const {
  allTeacher,
  allTypeDance,
  allHours,
  allStudents,
} = require("../controllers/allDataController");

const selectCaseAll = async (search) => {
  switch (search) {
    case "teacher":
      return await allTeacher();

    case "typeDance":
      return await allTypeDance();

    case "hours":
      return await allHours();

    default:
      break;
  }
};

const allDataHandler = async (request, response) => {
  const { dataRequest, idClass } = request.query;
  try {
    const data =
      idClass && dataRequest === "students"
        ? await allStudents(idClass)
        : await selectCaseAll(dataRequest);

    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = allDataHandler;
