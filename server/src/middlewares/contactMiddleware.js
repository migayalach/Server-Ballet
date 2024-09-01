const { dataId, stateCase } = require("./funAuxMiddleware");

const { emailRegex } = require("../helpers/regex");

const validateContact = (request, response, next) => {
  const { nameContact, emailContact, phoneContact } = request.body;

  if (!nameContact) {
    return response.status(400).json({
      message: `Por favor introduzca su nombre completo`,
    });
  }

  if (!emailRegex.test(emailContact)) {
    return response
      .status(400)
      .json({ message: "Por favor ingrese una direccion de correo valida" });
  }

  if (!phoneContact) {
    return response.status(400).json({
      message: `Por favor introduzca su numero de celular`,
    });
  }
  
  next();
};

const validateIdContact = (request, response, next) => {
  const { idContact } = request.params;
  if (!dataId(+idContact).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }
  next();
};

const validateResContact = (request, response, next) => {
  const { idContact, stateContact, feedback } = request.body;
  if (!dataId(+idContact).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un usuario valido` });
  }

  const stateValue = stateCase(stateContact);
  if (!stateValue.state) {
    return response.status(400).json({ message: stateValue.message });
  }

  if (!feedback.length) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un feedback mas desglosado` });
  }

  next();
};

module.exports = {
  validateContact,
  validateIdContact,
  validateResContact,
};
