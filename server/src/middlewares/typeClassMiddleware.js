const {
  dataId,
  lengthString,
  nameString,
} = require("./funAuxMiddleware");

const postTypeClassMiddleware = (request, response, next) => {
  const { nameClass } = request.body;
  const { state, message } = lengthString(nameClass);
  if (!state) {
    return response
      .status(400)
      .json({ message: `${message} el tipo de clase` });
  }
  const nameType = nameString(nameClass);
  if (!nameType.state) {
    return response.status(400).json({ message: nameType.message });
  }
  next();
};

const putTypeClassMiddleware = (request, response, next) => {
  const { idTypeClass, nameClass } = request.body;
  const typeId = dataId(idTypeClass);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
  const nameType = nameString(nameClass);
  if (!nameType.state) {
    return response.status(400).json({ message: nameType.message });
  }
  next();
};

const idTypeClassMiddleware = (request, response, next) => {
  const { idTypeClass } = request.params;
  const typeId = dataId(+idTypeClass);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
  next();
};

module.exports = {
  postTypeClassMiddleware,
  putTypeClassMiddleware,
  idTypeClassMiddleware,
};
