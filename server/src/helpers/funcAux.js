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

module.exports = {
  isNumber,
  isString,
  lengthName,
  lengthElderForElementents,
  levelExist,
  extensionExist,
  userRepeated,
  dateComplete
};
