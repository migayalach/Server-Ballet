const { dataId } = require("./funAuxMiddleware");

const validatePostAttendance = (request, response, next) => {
  const { idAssistance, list } = request.body;
  if (!dataId(+idAssistance).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una asistencia valida` });
  }

  if (!list.length) {
    return response.status(400).json(`Por favor adjunte la lista requerida`);
  }

  next();
};

const validateGetIdAttendance = (request, response, next) => {
  const { idAssistance } = request.params;

  if (!dataId(+idAssistance).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese una asistencia valida` });
  }

  next();
};

module.exports = {
  validatePostAttendance,
  validateGetIdAttendance,
};
