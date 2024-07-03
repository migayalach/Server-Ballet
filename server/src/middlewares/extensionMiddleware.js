const { lengthExtension, dataId } = require("./funAuxMiddleware");

const postExtensionMiddleware = (request, response, next) => {
  const { nameExtension } = request.body;
  const { state, message } = lengthExtension(nameExtension);
  if (!state) {
    return response.status(400).json({ message });
  }
  next();
};

const putExtensionMiddleware = (request, response, next) => {
  const { idExtension, nameExtension } = request.body;
  const typeId = dataId(idExtension);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }

  const { state, message } = lengthExtension(nameExtension);

  if (!state) {
    return response.status(400).json({ message });
  }
  next();
};

const deleteExtensionMiddleware = (request, response, next) => {
  const { idExtension } = request.params;
  const typeId = dataId(+idExtension);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
  next();
};

module.exports = {
  postExtensionMiddleware,
  putExtensionMiddleware,
  deleteExtensionMiddleware,
};
