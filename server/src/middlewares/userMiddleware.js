const {
  dataId,
  lengthCarnetUser,
  completeUser,
  regexCasting,
} = require("./funAuxMiddleware");

const postUserMiddleware = (request, response, next) => {
  const {
    idLevel,
    idExtension,
    nameUser,
    lastNameUser,
    emailUser,
    carnetUser,
  } = request.body;
  if (!dataId(idLevel).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un nivel valido` });
  }

  if (!dataId(idExtension).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una extension valida` });
  }

  if (!dataId(carnetUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un carnet` });
  }

  const constCarnet = lengthCarnetUser(carnetUser);
  if (!constCarnet.state) {
    return response.status(400).json({ message: constCarnet.message });
  }

  const infoUser = completeUser(nameUser, lastNameUser, emailUser);
  if (!infoUser.state) {
    return response.status(400).json({ message: infoUser.message });
  }

  const { state, message } = regexCasting(emailUser);
  if (!state) {
    return response.status(400).json({ message });
  }

  next();
};

const putUserMiddleware = (request, response, next) => {
  next();
};

const deleteUserMiddleware = (request, response, next) => {
  next();
};

module.exports = {
  postUserMiddleware,
  putUserMiddleware,
  deleteUserMiddleware,
};
