const { isString } = require("../helpers/funcAux");
const { emailRegex } = require("../helpers/regex");

function lengthExtension(nameExtension) {
  if (nameExtension.length < 2) {
    return {
      state: false,
      message: `Por favor ingrese un nombre para la extension`,
    };
  }

  if (nameExtension.length > 4) {
    return {
      state: false,
      message: `La extension no puede tener mas de 4 caracteres`,
    };
  }

  return { state: true };
}

function dataId(idData) {
  if (typeof idData === "string" || isNaN(idData)) {
    return {
      state: false,
      message: `El parametro debe ser un numero`,
    };
  }

  if (idData < 1) {
    return {
      state: false,
      message: `El parametro debe ser valido`,
    };
  }

  return { state: true };
}

function lengthName(nameLevel) {
  if (!nameLevel.length) {
    return {
      state: false,
      message: `Por favor ingrese un nombre para el nivel`,
    };
  }
  return { state: true };
}

function lengthCarnetUser(carnetUser) {
  const lengthCarnet = carnetUser.toString();

  if (lengthCarnet.length < 0) {
    return {
      state: false,
      message: `Por favor ingrese un carnet valido`,
    };
  }

  if (lengthCarnet.length > 10) {
    return {
      state: false,
      message: `Por favor ingrese un carnet valido`,
    };
  }
  return { state: true };
}

function completeUser(name, lastName, email) {
  if (!isString(name) || !name.length || name.length < 3) {
    return {
      state: false,
      message: `Por introduzca un nombre valido`,
    };
  }
  if (!isString(lastName) || !lastName.length || lastName.length < 8) {
    return {
      state: false,
      message: `Por favor introduzca los apellidos`,
    };
  }

  if (!isString(email) || !email.length) {
    return {
      state: false,
      message: `Por favor introduzca el email`,
    };
  }

  return { state: true };
}

function regexCasting(email) {
  if (!emailRegex.test(email)) {
    return {
      state: false,
      message: `Por favor agrege una direccion de correo valida`,
    };
  }
  return { state: true };
}

module.exports = {
  lengthExtension,
  dataId,
  lengthName,
  completeUser,
  lengthCarnetUser,
  regexCasting,
};
