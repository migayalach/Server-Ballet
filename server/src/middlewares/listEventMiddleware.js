const { dataId, stateCase } = require("./funAuxMiddleware");

const validateList = (request, response, next) => {
  const { hour, dateNews, title, body, urlPicture } = request.body;
  if (!hour.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una hora valida` });
  }

  if (hour.length > 8) {
    return response.status(400).json({ message: `Error al asignar horas` });
  }

  if (!dateNews.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una fecha` });
  }

  if (!title.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un titulo` });
  }

  if (!body.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una descripcion` });
  }

  if (!urlPicture.length) {
    return response.status(400).json({
      message: `Por favor ingrese una direccion donde se encuentra la fotografia`,
    });
  }

  next();
};

const validateIdContact = (request, response, next) => {
  const { idListEvent } = request.params;
  if (!dataId(+idListEvent).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un evento registrado` });
  }
  next();
};

const validateResContact = (request, response, next) => {
  const { idListEvent, hour, dateNews, title, body, stateEvent } = request.body;

  if (!dataId(+idListEvent).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un evento registrado` });
  }

  if (!hour.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una hora valida` });
  }

  if (hour.length > 8) {
    return response.status(400).json({ message: `Error al asignar horas` });
  }

  if (!dateNews.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una fecha` });
  }

  if (!title.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un titulo` });
  }

  if (!body.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una descripcion` });
  }

  const stateValue = stateCase(stateEvent);
  if (!stateValue.state) {
    return response.status(400).json({ message: stateValue.message });
  }

  next();
};

module.exports = {
  validateList,
  validateIdContact,
  validateResContact,
};
