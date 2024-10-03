const pool = require("../dataBase/conexion");

const passwordChangeController = async (idUser, newPassword, oldPassword) => {
  return `${idUser} - ${newPassword} - ${oldPassword}`;
};

module.exports = passwordChangeController;
