const { lengthName, dataId } = require("./funAuxMiddleware");

const postLevelMiddleware = (request, response, next) => {
  const { nameLevel } = request.body;
  const { state, message } = lengthName(nameLevel);
  if (!state) {
    return response.status(400).json({ message });
  }
  next();
};

const putLevelMiddleware = (request, response, next) => {
  const { idLevel, nameLevel } = request.body;
  const typeId = dataId(idLevel);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }

  const { state, message } = lengthName(nameLevel);
  if (!state) {
    return response.status(400).json({ message });
  }
  next();
};

const deleteLevelMiddleware = (request, response, next) => {
  const { idLevel } = request.params;
  const typeId = dataId(+idLevel);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
  next();
};

module.exports = {
  postLevelMiddleware,
  putLevelMiddleware,
  deleteLevelMiddleware,
};
