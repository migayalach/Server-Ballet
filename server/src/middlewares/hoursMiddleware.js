const { dataId, stateCase } = require("./funAuxMiddleware");

const postHoursMiddleware = (request, response, next) => {
  const { startTime, endTime, totalTime } = request.body;
  if (!startTime.length && !endTime.length) {
    return response
      .status(400)
      .json({ message: `Por favor asigne una hora de inicio y fin` });
  }
  if (startTime.length > 8 || endTime.length > 8 || totalTime.length > 8) {
    return response.status(400).json({ message: `Error al asignar horas` });
  }
  next();
};

const putHoursMiddleware = (request, response, next) => {
  const { idHours, startTime, endTime, totalTime, stateHours } = request.body;

  const typeHours = dataId(+idHours);
  if (!typeHours.state) {
    return response
      .status(400)
      .json({ message: `Se necesita una hora para esta accion` });
  }

  if (!startTime.length && !endTime.length) {
    return response
      .status(400)
      .json({ message: `Por favor asigne una hora de inicio y fin` });
  }
  if (startTime.length > 8 || endTime.length > 8 || totalTime.length > 8) {
    return response.status(400).json({ message: `Error al asignar horas` });
  }

  const stateValue = stateCase(stateHours);
  if (!stateValue.state) {
    return response.status(400).json({ message: stateValue.message });
  }
  next();
};

const idHoursMiddleware = (request, response, next) => {
  const { idHours } = request.params;

  const typeHours = dataId(+idHours);
  if (!typeHours.state) {
    return response
      .status(400)
      .json({ message: `Se necesita una hora para esta accion` });
  }
  next();
};

module.exports = {
  postHoursMiddleware,
  putHoursMiddleware,
  idHoursMiddleware,
};
