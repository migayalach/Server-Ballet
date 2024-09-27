const {
  dataId,
  lengthCarnetUser,
  completeUser,
  regexCasting,
  stateCase,
} = require("./funAuxMiddleware");

const postUserMiddleware = (request, response, next) => {
  const {
    idLevel,
    idExtension,
    nameUser,
    lastNameUser,
    emailUser,
    numberPhone,
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

  if (!dataId(+carnetUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un carnet` });
  }

  if (!dataId(+numberPhone).state) {
    return response
      .status(400)
      .json({ message: `Ingrese un numero de contacto!` });
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
  const {
    idUser,
    idLevel,
    idExtension,
    nameUser,
    lastNameUser,
    emailUser,
    carnetUser,
    numberPhone,
    stateUser,
  } = request.body;
  const typeId = dataId(+idUser);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
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

  if (!dataId(numberPhone).state) {
    return response
      .status(400)
      .json({ message: `Ingrese un numero de contacto!` });
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

  const stateValue = stateCase(stateUser);
  if (!stateValue.state) {
    return response.status(400).json({ message: stateValue.message });
  }

  next();
};

const getIdUserMiddleware = (request, response, next) => {
  const { idUser } = request.params;
  const typeId = dataId(+idUser);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
  next();
};

const deleteUserMiddleware = (request, response, next) => {
  const { idUser } = request.params;
  const typeId = dataId(+idUser);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
  next();
};

module.exports = {
  postUserMiddleware,
  putUserMiddleware,
  deleteUserMiddleware,
  getIdUserMiddleware,
};
