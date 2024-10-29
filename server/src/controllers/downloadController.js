const pool = require("../dataBase/conexion.js");
const { existUser } = require("./controllerData");
const { allClassStudent } = require("./classStudentController");
const { existClass } = require("../controllers/controllerData.js");
const { listStudentsPDF } = require("../helpers/printPDF");
const {
  listAssistanceExcel,
  listQualificationExcel,
} = require("../helpers/printEXCEL");

const generateListAssitance = async (idClass, idAssistance, idUser) => {
  await existUser(idUser);
  await existClass(idClass);

  const [data] = await pool.query(
    `SELECT a.idUser, a.idAssistance, u.nameUser, u.lastNameUser, u.carnetUser, a.assistance FROM attendance a, user u WHERE a.idUser = u.idUser AND idAssistance = ?`,
    [idAssistance]
  );

  let [info] = await pool.query(
    `SELECT u.nameUser, u.lastNameUser, t.nameClass, c.parallel, a.dateAssistance FROM assistance a, class c, typeClass t, user u WHERE a.idClass = c.idClass AND t.idTypeClass = c.idTypeClass AND u.idUser = c.idUser AND a.idAssistance = ?`,
    [idAssistance]
  );

  info = info.map(
    ({ nameUser, lastNameUser, nameClass, parallel, dateAssistance }) => ({
      teacher: `${nameUser} ${lastNameUser}`,
      nameClass,
      parallel,
      date: dateAssistance,
    })
  );

  const assitanceMap = data.map(
    ({ nameUser, lastNameUser, carnetUser, assistance }, index) => ({
      index: index + 1,
      nameUser,
      lastNameUser,
      carnetUser,
      assistance: assistance ? "✓" : "X",
    })
  );

  return listAssistanceExcel(assitanceMap, info);
};

const generateListQualification = async(idUser, idClass, idParams) => {
  await existUser(idUser);
  await existClass(idClass);
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
  
  return response
};

const generateListStudents = async (idClass, idUser) => {
  await existUser(idUser);
  let data = await allClassStudent(+idClass);
  data = data.map(
    (
      { nameUser, lastNameUser, emailUser, carnetUser, numberPhone },
      index
    ) => ({
      index: index + 1,
      nameUser,
      lastNameUser,
      emailUser,
      carnetUser,
      numberPhone,
    })
  );
  return listStudentsPDF(data);
};

module.exports = {
  generateListStudents,
  generateListAssitance,
  generateListQualification,
};

// ACCESSO TODOS
// LISTA DE ALUMNOS PDF ok

// SOLO PARA PROFESORES, DIRECTOR Y SECRETARIA
// GENERAR EXCEL DE ASISTENCIA Y NOTAS 

// ACCESSO TODOS
// IMPRIMIR DE CADA ALUMNO SU HISTORIAL DE NOTAS EN PDF
// IMPRIMIR HISTORIAL DE ASISTENCIAS EN PDF
