const { dataId } = require("./funAuxMiddleware");

const validatePostParams = (request, response, next) => {
  const { idClass, dateTest, title, params } = request.body;

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
  const { idClass } = request.params;
 
  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }
  next();
};

const validateUpdateParams = (request, response, next) => {
  const { idParams, idClass, dateTest, title, params } = request.body;
  if (!dataId(+idParams).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un parametro valido` });
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
  const { idClass, idParams } = request.params;
  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un clase valida` });
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
