const {
  lengthPassword,
  letterLowerCase,
  letterCapitalLetter,
  numberPassword,
  characterSpecial,
} = require("../helpers/regex");

function passwordCases(request, response, next) {
  const { password } = request.body;

  if (!lengthPassword.test(password)) {
    return response
      .status(400)
      .json({ message: `La contraseña debe tener al menos 8 caracteres` });
  }
  if (!letterLowerCase.test(password)) {
    return response.status(400).json({
      message: `La contraseña debe tener al menos una letra minúscula`,
    });
  }
  if (!letterCapitalLetter.test(password)) {
    return response.status(400).json({
      message: `La contraseña debe tener al menos una letra mayúscula`,
    });
  }
  if (!numberPassword.test(password)) {
    return response
      .status(400)
      .json({ message: `La contraseña debe tener al menos un número` });
  }
  if (!characterSpecial.test(password)) {
    return response.status(400).json({
      message: `La contraseña debe tener al menos un carácter especial (@, $, !, %, *, ?, &)`,
    });
  }
  next();
}

module.exports = passwordCases;
