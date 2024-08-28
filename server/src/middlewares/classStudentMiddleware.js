const { dataId } = require("./funAuxMiddleware");

const validategetIdClassStu = (request, response, next) => {
  const { idClass } = request.params;
  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  next();
};

const validatePostClassStu = (request, response, next) => {
  const { idClass, idUser } = request.body;
  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  if (!dataId(+idUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }

  next();
};

const validateDeleteClassStu = (request, response, next) => {
  const { idClass, idUser } = request.params;
  
  if (!dataId(+idClass).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una clase valida` });
  }

  if (!dataId(+idUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }

  next();
};

module.exports = {
  validategetIdClassStu,
  validatePostClassStu,
  validateDeleteClassStu,
};
