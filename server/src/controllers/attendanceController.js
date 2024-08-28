const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");

const addAttendance = async (idAssistance, list) => {
  const [data] = await pool.query(
    `SELECT * FROM assistance WHERE idAssistance = ?`,
    [idAssistance]
  );

  if (!data.length) {
    throw Error("El registro no existe");
  }

  await Promise.all(
    list.map(async ({ idUser, assistance }) => {
      return await pool.query(
        `UPDATE attendance SET assistance = ? WHERE idUser = ? AND idAssistance = ?`,
        [assistance, idUser, idAssistance]
      );
    })
  );
  return "Registado con exito";
};

const getAllList = async (idAssistance, flag) => {
    const [data] = await pool.query(
      `SELECT a.idUser, a.idAssistance, u.nameUser, u.lastNameUser, u.carnetUser, a.assistance FROM attendance a, user u WHERE a.idUser = u.idUser AND idAssistance = ?`,
      [idAssistance]
    );
    if (!data.length) {
      throw Error(`Lo siento no se encontro registro alguno`);
    }
    if (flag === "frontend") {
      return data;
    } else {
      return responseData(data, "attendance", (page = 1), idAssistance);
    }
};

const getPageAttendance = async (idAssistance, page) => {
  const [data] = await pool.query(
    `SELECT * FROM attendance WHERE idAssistance = ?`,
    [idAssistance]
  );
  return responseData(data, "attendance", page, idAssistance);
};

module.exports = { addAttendance, getAllList, getPageAttendance };
