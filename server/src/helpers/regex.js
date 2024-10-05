const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const lengthPassword = /.{8,}/;
const letterLowerCase = /(?=.*[a-z])/;
const letterCapitalLetter = /(?=.*[A-Z])/;
const numberPassword = /(?=.*\d)/;
const characterSpecial = /(?=.*[.@$!%*?&])/;

module.exports = {
  emailRegex,
  passwordRegex,
  lengthPassword,
  letterLowerCase,
  letterCapitalLetter,
  numberPassword,
  characterSpecial,
};
