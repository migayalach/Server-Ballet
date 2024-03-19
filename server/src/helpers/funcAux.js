function isNumber(idLevel) {
  if (typeof idLevel === "number") {
    return false;
  }
  if (idLevel % 1 !== 0) {
    return false;
  }
  return true;
}

function lengthNameLevel(nameLevel) {
  if (!nameLevel.length) {
    return false;
  }
  return true;
}

function toNumber(idLevel) {
  if (typeof idLevel === "string") {
    return false;
  }
  if (idLevel % 1 !== 0) {
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

module.exports = {
  isNumber,
  lengthNameLevel,
  toNumber,
  lengthElderForElementents,
};
