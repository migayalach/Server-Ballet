const {
  lengthPassword,
  letterLowerCase,
  letterCapitalLetter,
  numberPassword,
  characterSpecial,
} = require("../helpers/regex");
const { dataId } = require("./funAuxMiddleware");

function passwordCases(request, response, next) {
  const { idUser, newPassword, oldPassword } = request.body;

  if (!dataId(+idUser).state) {
    return response
      .status(400)
      .json({ message: `Por favor ingrese un parametro valido` });
  }

  if (newPassword === oldPassword) {
    return response
      .status(400)
      .json({ message: `La nueva contraseña no puede ser igual a la antigua` });
  }

  if (!lengthPassword.test(newPassword) || !lengthPassword.test(oldPassword)) {
    return response
      .status(400)
      .json({ message: `La contraseña debe tener al menos 8 caracteres` });
  }
  if (
    !letterLowerCase.test(newPassword) ||
    !letterLowerCase.test(oldPassword)
  ) {
    return response.status(400).json({
      message: `La contraseña debe tener al menos una letra minúscula`,
    });
  }
  if (
    !letterCapitalLetter.test(newPassword) ||
    !letterCapitalLetter.test(oldPassword)
  ) {
    return response.status(400).json({
      message: `La contraseña debe tener al menos una letra mayúscula`,
    });
  }
  if (!numberPassword.test(newPassword) || !numberPassword.test(oldPassword)) {
    return response
      .status(400)
      .json({ message: `La contraseña debe tener al menos un número` });
  }
  if (
    !characterSpecial.test(newPassword) ||
    !characterSpecial.test(oldPassword)
  ) {
    return response.status(400).json({
      message: `La contraseña debe tener al menos un carácter especial (., @, $, !, %, *, ?, &)`,
    });
  }
  next();
}

module.exports = passwordCases;
