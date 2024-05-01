const bcrypt = require("bcrypt");
const pool = require("../dataBase/conexion");

// TODO ACCESO LOGIN
const loginAccess = async (email, password) => {
  const [data] = await pool.query(
    `SELECT s.nameUser, s.lastNameUser, s.emailUser, s.passwordUser, l.nameLevel FROM user s, level l WHERE s.idLevel = l.idLevel AND s.emailUser = ? `,
    [email]
  );
  if (!data.length) {
    throw Error(`Usuario no encontrado`);
  }
  if (!(await bcrypt.compare(password, data[0].passwordUser))) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    access: true,
    user: `${data[0].nameUser} ${data[0].lastNameUser}`,
    level: `${data[0].nameLevel}`,
  };
};

module.exports = loginAccess;
