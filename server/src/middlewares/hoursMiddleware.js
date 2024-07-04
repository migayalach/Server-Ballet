const {
  dataId,
  stateCase,
  lengthString,
  nameString,
} = require("./funAuxMiddleware");

const postHoursMiddleware = (request, response, next) => {
  const { startTime, endTime, totalTime } = request.body;
};

const putHoursMiddleware = (request, response, next) => {
  const { idHours, startTime, endTime, totalTime, stateHours } = request.body;
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
