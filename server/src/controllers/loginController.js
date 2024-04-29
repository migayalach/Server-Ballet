const bcrypt = require("bcrypt");
const pool = require("../dataBase/conexion");

const loginAccess = async (email, password) => {
  const [data] = await pool.query(
    `SELECT s.nameStaff, s.lastNameStaff, s.emailStaff, s.passwordStaff, l.nameLevel FROM staff s, level l WHERE s.idLevel = l.idLevel AND s.emailStaff = ? `,
    [email]
  );
  if (!data.length) {
    throw Error(`Usuario no encontrado`);
  }
  if (!(await bcrypt.compare(password, data[0].passwordStaff))) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    access: true,
    user: `${data[0].nameStaff} ${data[0].lastNameStaff}`,
    level: `${data[0].nameLevel}`,
  };
};

module.exports = loginAccess;
