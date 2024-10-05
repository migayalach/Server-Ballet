const { getIdUser } = require("./userController");
const bcrypt = require("bcrypt");
const hashedPassword = require("../utils/passwordEncrypt");
const pool = require("../dataBase/conexion");

const passwordChangeController = async (idUser, oldPassword, newPassword) => {
  await getIdUser(idUser);
  const [data] = await pool.query(
    `SELECT s.passwordUser FROM user s WHERE s.idUser = ? `,
    [idUser]
  );

  if (!(await bcrypt.compare(oldPassword, data[0].passwordUser))) {
    throw new Error("La contraseña antigua es incorrecta");
  }

  await pool.query(`UPDATE user SET passwordUser = ? WHERE idUser = ?`, [
    await hashedPassword(newPassword),
    idUser,
  ]);
  
  return { state: true, message: `Contraseña actualizada con exito` };
};

module.exports = passwordChangeController;
