function isNumber(idElement) {
  if (isNaN(idElement)) {
    return true;
  }
  return false;
}

function isString(idElement) {
  if (typeof idElement === "string") {
    return true;
  }
  return false;
}

function lengthName(nameLevel) {
  if (!nameLevel.length) {
    return false;
  }
  return true;
}

function lengthElderForElementents(nameExtension) {
  if (nameExtension.length > 4) {
    return false;
  }
  return true;
}

function levelExist(idLevel) {
  if (idLevel) {
    return false;
  }
  return true;
}

function extensionExist(idExtension) {
  if (idExtension) {
    return false;
  }
  return true;
}

function userRepeated(carnetStaff) {
  if (carnetStaff) {
    return false;
  }
  return true;
}

function dateComplete(startTime, endTime, totalTime) {
  if (isString(startTime) && isString(endTime) && isString(totalTime)) {
    if (startTime.length && endTime.length && totalTime.length) {
      return true;
    }
    throw Error("Solo se aceptan horas completas");
  }
  throw Error(`Por favor ingrese las horas solicitadas`);
}

function codeUser(lastName, name, carnet) {
  const nameLast = lastName.split(" ");
  const codeUser = `${nameLast[0].slice(0, 2)}${nameLast[1].slice(
    0,
    2
  )}${name.slice(0, 2)}${carnet.toString().slice(0, 2)}`.toUpperCase();
  return codeUser;
}

function completeUser(idExtension, name, lastName, email, carnet) {
  if (isNumber(idExtension) || isString(idExtension)) {
    throw Error(`Por favor asigne una extension`);
  }
  if (!isString(name) || !lengthName(name)) {
    throw Error(`Por introduzca un nombre`);
  }
  if (!isString(lastName) || !lengthName(lastName)) {
    throw Error(`Por favor introduzca los apellidos`);
  }
  if (!isString(email) || !lengthName(email)) {
    throw Error(`Por favor introduzca el email`);
  }
  if (isNumber(carnet) || isString(carnet)) {
    throw Error(`Por favor introduzca el numero de carnet`);
  }
  return true;
}

function stateBoolean(state) {
  if (typeof state === "boolean") {
    return true;
  }
  throw Error(`Por favor asigne un estado`);
}

module.exports = {
  isNumber,
  isString,
  lengthName,
  lengthElderForElementents,
  levelExist,
  extensionExist,
  userRepeated,
  dateComplete,
  codeUser,
  completeUser,
  stateBoolean,
};
