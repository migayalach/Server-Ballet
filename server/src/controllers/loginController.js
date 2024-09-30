const bcrypt = require("bcrypt");
const pool = require("../dataBase/conexion");
const { getIdUser } = require("../controllers/userController");

// TODO ACCESO LOGIN
const loginAccess = async (email, password) => {
  const [data] = await pool.query(
    `SELECT s.idUser, s.nameUser, s.lastNameUser, s.emailUser, s.passwordUser, l.nameLevel FROM user s, level l WHERE s.idLevel = l.idLevel AND s.emailUser = ? `,
    [email]
  );
  if (!data.length) {
    throw Error(`Usuario no encontrado`);
  }
  if (!(await bcrypt.compare(password, data[0].passwordUser))) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    state: "login",
    access: {
      idUser: `${data[0].idUser}`,
      level: `${data[0].nameLevel}`,
      name: data[0].nameUser.split(" ").slice(0, 1)[0],
    },
  };
};

module.exports = loginAccess;
