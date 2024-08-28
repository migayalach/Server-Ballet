const { dataId } = require("./funAuxMiddleware");

const validatePostAssistance = (request, response, next) => {
  const { idClass, dateAssistance } = request.body;
  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  if (!dateAssistance.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una fecha valida` });
  }

  next();
};

const validateIdAssistance = (request, response, next) => {
  const { idClass } = request.params;

  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  next();
};

const validateUpdateAssistance = (request, response, next) => {
  const { idAssistance, idClass, dateAssistance } = request.body;
  if (!dataId(+idAssistance).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una asistencia valida` });
  }

  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  if (!dateAssistance.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una fecha valida` });
  }

  next();
};

const validateDeleteAssistance = (request, response, next) => {
  const { idClass, idAssistance } = request.params;
  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }
  if (!dataId(+idAssistance).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una asistencia valida` });
  }
  next();
};

module.exports = {
  validatePostAssistance,
  validateIdAssistance,
  validateUpdateAssistance,
  validateDeleteAssistance,
};
