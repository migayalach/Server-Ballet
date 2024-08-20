const { dataId } = require("./funAuxMiddleware");

const validatePostParams = (request, response, next) => {
  const { idUser, idClass, dateTest, title, params } = request.body;
  if (!dataId(+idUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }

  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  if (!dateTest.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una fecha` });
  }

  if (!title.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un titulo` });
  }

  if (!params.length) {
    return response.status(400).json(`Por favor asigne parametros a calificar`);
  }

  next();
};

const validateIdParams = (request, response, next) => {
  const { idUser } = request.params;
  if (!dataId(+idUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }
  next();
};

const validateUpdateParams = (request, response, next) => {
  const { idParams, idUser, idClass, dateTest, title, params } = request.body;
  if (!dataId(+idParams).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un parametro valido` });
  }

  if (!dataId(+idUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }

  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  if (!dateTest.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una fecha` });
  }

  if (!title.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un titulo` });
  }

  if (!params.length) {
    return response.status(400).json(`Por favor asigne parametros a calificar`);
  }
  next();
};

const validateDeleteParams = (request, response, next) => {
  const { idUser, idParams } = request.params;
  if (!dataId(+idUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }
  if (!dataId(+idParams).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un parametro valido` });
  }
  next();
};

module.exports = {
  validatePostParams,
  validateIdParams,
  validateUpdateParams,
  validateDeleteParams,
};
