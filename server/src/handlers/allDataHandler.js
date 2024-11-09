const {
  allTeacher,
  allTypeDance,
  allHours,
  allStudents,
  infoCourse,
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
  const { dataRequest, idClass, idUser } = request.query;
  try {
    let data = [];
    if (dataRequest === "students" && idClass) {
      data = await allStudents(idClass);
    } else if (dataRequest === "course" && idUser) {
      data = await infoCourse(idUser);
    } else {
      data = await selectCaseAll(dataRequest);
    }

    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = allDataHandler;
