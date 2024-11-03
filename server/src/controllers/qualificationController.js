const { responseData } = require("../utils/response");
const pool = require("../dataBase/conexion");
const { getIdUser } = require("./userController");

const createQualification = async (idParams, arrayData) => {
  const noteFinish = arrayData.map(
    ({ idUser, observation, note, qualification }) => ({
      idUser,
      qualification,
      observation,
      note,
    })
  );

  // BORRAR REGISTROS ANTERIORES
  await deleteQualification(idParams);

  // INSERTAR A LA BASE DE DATOS
  await Promise.all(
    noteFinish.map(async ({ idUser, qualification, observation, note }) => {
      return await pool.query(
        `INSERT INTO qualification (idParams, idUser, qualification, observation, note) VALUES (?, ?, ?, ?, ?)`,
        [idParams, idUser, JSON.stringify(qualification), observation, note]
      );
    })
  );

  let cutNote = 0;

  for (let i = 0; i < noteFinish.length; i++) {
    cutNote += noteFinish[i].note;
  }

  cutNote = (cutNote / noteFinish.length).toFixed(1);

  await pool.query(`UPDATE params SET noteFinish = ? WHERE idParams = ?`, [
    cutNote,
    idParams,
  ]);

  // MOSTRAR NUEVO REGISTRO CON LAS NOTAS
  return await getAllQualification(idParams, (page = 1));
};

const deleteQualification = async (idParams) => {
  const [data] = await pool.query(
    `DELETE FROM qualification WHERE idParams = ${idParams}`
  );
  if (data.affectedRows > 0) {
    return;
  }
  throw Error(`No se pudo realizar esta operacion!`);
};

const getAllQualification = async (idParams, page, flag) => {
  // TRAER LISTA CON TODOS LOS ESTUDIANTES A CALIFICAR
  const [data] = await pool.query(
    `SELECT q.*, u.nameUser, u.lastNameUser, u.carnetUser, e.department FROM qualification q, user u, extension e WHERE q.idParams = ${idParams} AND q.idUser = u.idUser AND u.idExtension = e.idExtension`
  );

  const response = data.map(
    ({
      idParams,
      idUser,
      nameUser,
      lastNameUser,
      carnetUser,
      department,
      qualification,
      observation,
      note,
    }) => ({
      idParams,
      idUser,
      nameUser,
      lastNameUser,
      carnetUser,
      department,
      qualification: JSON.parse(qualification),
      observation,
      note,
    })
  );
  const [paramsData] = (
    await pool.query(`SELECT * FROM params WHERE idParams = ?`, [idParams])
  )[0].map(({ dateTest, title, params, noteFinish }) => ({
    dateTest,
    title,
    params: JSON.parse(params).map(({ item, calification, description }) => ({
      item,
      calification,
      description,
    })),
    noteFinish,
  }));

  if (flag === "frontend") {
    return { params: paramsData, results: response };
  } else {
    const { info, results } = responseData(response, "qualification", page, {
      idParams,
    });

    return {
      info,
      params: paramsData,
      results,
    };
  }
};

module.exports = {
  getAllQualification,
  createQualification,
  deleteQualification,
};
