const { dataId } = require("./funAuxMiddleware");

const validateGetQuaAll = (request, response, next) => {
  const { idParams } = request.query;

  if (!dataId(+idParams).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un parametro valido` });
  }

  next();
};

const validatePostQua = (request, response, next) => {
  const { idParams, arrayData } = request.body;

  if (!dataId(+idParams).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un parametro valido` });
  }

  if (!arrayData.length) {
    return response.status(400).json(`Por favor angrese calificaciones`);
  }

  next();
};

module.exports = {
  validateGetQuaAll,
  validatePostQua,
};
