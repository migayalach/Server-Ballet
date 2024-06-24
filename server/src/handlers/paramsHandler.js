const {
  createParams,
  // getAllParams,
  // getPageParams,
  getIdParams,
  updateParams,
  removeParams,
} = require("../controllers/paramsController");

const postParams = async (request, response) => {
  const { idUser, idClass, dateTest, title, params } = request.body;
  try {
    const data = await createParams(idUser, idClass, dateTest, title, params);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getParamsId = async (request, response) => {
  const { idUser } = request.params;
  try {
    const data = await getIdParams(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putParams = async (request, response) => {
  const { idParams, idUser, idClass, dateTest, title, params } = request.body;
  try {
    const data = await updateParams(
      idParams,
      idUser,
      idClass,
      dateTest,
      title,
      params
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// const getParamsAllPage = async (request, response) => {
//   const { page } = request.query;
//   try {
//     const data = !page ? await getAllParams() : await getPageParams(page);
//     response.status(200).json(data);
//   } catch (error) {
//     response.status(400).json({ error: error.message });
//   }
// };

const deleteParams = async (request, response) => {
  const { idUser, idParams } = request.params;
  try {
    const data = await removeParams(idUser, idParams);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postParams,
  getParamsId,
  putParams,
  deleteParams,
  // getParamsAllPage,
};
