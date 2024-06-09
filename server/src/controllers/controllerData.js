// BASE DE DATOS
const pool = require("../dataBase/conexion");

// LEVEL
async function allLevel() {
  const [data] = await pool.query("SELECT * FROM level");
  return data;
}

async function existIdLevel(idLevel) {
  const [data] = await pool.query(
    `SELECT idLevel FROM level WHERE idLevel=${idLevel}`
  );
  if (!data.length) {
    return false;
  }
  return true;
}

async function repeatedLevel(nameLevel) {
  const [data] = await pool.query(
    `SELECT nameLevel from level WHERE nameLevel LIKE '%${nameLevel}%'`
  );
  if (!data.length) {
    return false;
  }
  return true;
}

async function nameLevelData(value) {
  const [data] = await pool.query(
    `SELECT idLevel FROM level WHERE nameLevel LIKE ? `,
    [`%${value}%`]
  );
  if (!data.length) {
    throw Error(`El nivel que usted quiere asignar no existe`);
  }
  return data[0].idLevel;
}

async function selectMaxLevel() {
  const [data] = await pool.query(
    "SELECT idLevel FROM level WHERE nameLevel LIKE '%director%'"
  );
  return data[0].idLevel;
}

// EXTENSION
async function allExtension() {
  const [data] = await pool.query(`SELECT * FROM extension`);
  return data;
}

async function repeatedNameExtension(nameExtension) {
  const [data] = await pool.query(
    `SELECT department FROM extension WHERE department LIKE ?`,
    [`%${nameExtension}%`]
  );
  return data;
}

async function repeatedExtension(nameExtension) {
  const [data] = await pool.query(
    `SELECT department FROM extension WHERE department LIKE ?`,
    [`%${nameExtension}%`]
  );
  if (!data.length) {
    return false;
  }
  return true;
}

async function existExtension(idExtension) {
  const [data] = await pool.query(
    "SELECT * FROM extension WHERE idExtension = ?",
    [idExtension]
  );
  if (!data.length) {
    return false;
  }
  return data[0];
}

// HOURS
async function allHours() {
  const [data] = await pool.query("SELECT * FROM hours");
  return data;
}

async function existIdHours(idHours) {
  const [data] = await pool.query(
    `SELECT idHours FROM hours WHERE idHours = ?`,
    [idHours]
  );
  if (!data.length) {
    return false;
  }
  return true;
}

// TYPE CLASS
async function allTypeClass() {
  const [data] = await pool.query(`SELECT * FROM typeClass`);
  return data;
}

async function matchNameClass(nameClass) {
  const [data] = await pool.query(
    "SELECT nameClass FROM typeClass WHERE nameClass LIKE ? ",
    [`%${nameClass}%`]
  );
  if (data.length) {
    return true;
  }
  return false;
}

async function existIdTypeClass(idTypeClass) {
  const [data] = await pool.query(
    "SELECT idTypeClass FROM typeClass WHERE idTypeClass = ? ",
    [idTypeClass]
  );
  if (!data.length) {
    return false;
  }
  return true;
}

// STUDENT
async function matchCarnetUser(carnetStudent) {
  const [data] = await pool.query(
    "SELECT carnetUser FROM user WHERE carnetUser = ?",
    [carnetStudent]
  );
  if (!data.length) {
    return true;
  }
  return false;
}

async function allStudent() {
  const [data] = await pool.query(
    "SELECT u.idUser, u.idLevel, l.nameLevel, u.idExtension, e.department, u.nameUser, u.lastNameUser, u.emailUser, u.addressUser, u.dateBirthUser, u.carnetUser, u.photoUser, u.stateUser FROM user u, level l, extension e WHERE l.nameLevel = 'ESTUDIANTE' AND u.idLevel = l.idLevel AND u.idExtension = e.idExtension"
  );
  return data;
}

// BUSQUEDA DE CARNET DE ESTUDIANTE Y STAFF
async function matchEmail(table, column, carnet) {
  const [data] = await pool.query(
    `SELECT * FROM ${table} WHERE ${column} = ?`,
    [carnet]
  );
  if (data.length) {
    return true;
  }
  return false;
}

// STAFF
async function countUser() {
  const [data] = await pool.query("SELECT COUNT(*) AS TOTAL FROM user");
  return data[0].TOTAL;
}

async function matchCarnetStaff(carnetStaff) {
  const [data] = await pool.query(
    "SELECT carnetStaff FROM staff WHERE carnetStaff = ?",
    [carnetStaff]
  );
  if (!data.length) {
    return true;
  }
  return false;
}

async function allUser() {
  const [data] = await pool.query("SELECT * FROM user");
  return data;
}

async function existUser(idUser) {
  const [data] = await pool.query("SELECT idUser FROM user WHERE idUser = ? ", [
    idUser,
  ]);
  if (!data.length) {
    throw Error("No se pudo encontrar el usuario");
  }
  return true;
}

// CLASS
async function existParallel(parallel) {
  const [data] = await pool.query(
    "SELECT parallel FROM class WHERE parallel LIKE ?",
    [`%${parallel}%`]
  );
  if (data.length) {
    throw Error(`Lo siento este paralelo ya se encuentra asignado`);
  }
  return;
}

async function allClass() {
  const [data] = await pool.query(
    "SELECT c.idClass, h.totalTime, s.idUser, s.nameUser, s.lastNameUser, s.carnetUser, e.department, t.nameClass, c.parallel, c.stateClass FROM class c, typeClass t, user s, hours h, extension e WHERE c.idTypeClass = t.idTypeClass AND c.idHours = h.idHours AND c.idUser = s.idUser AND  s.idExtension = e.idExtension"
  );
  return data;
}

async function existClass(idClass) {
  const [data] = await pool.query(
    "SELECT stateClass FROM class WHERE idClass = ? ",
    [idClass]
  );
  if (!data.length) {
    throw Error(`La clase no existe`);
  }
  return;
}

const allParams = async () => {
  const [data] = await pool.query(
    "SELECT p.idParams, p.idClass, c.parallel, u.nameUser, u.lastNameUser, p.dateTest, p.title FROM params p, class c, user u WHERE p.idClass = c.idClass AND u.idUser = c.idUser"
  );
  return data;
};

module.exports = {
  selectMaxLevel,
  allLevel,
  existIdLevel,
  repeatedLevel,
  nameLevelData,
  allExtension,
  repeatedNameExtension,
  repeatedExtension,
  existExtension,
  allHours,
  existIdHours,
  allTypeClass,
  matchNameClass,
  existIdTypeClass,
  matchCarnetUser,
  matchEmail,
  allStudent,
  countUser,
  matchCarnetStaff,
  allUser,
  existUser,
  existParallel,
  allClass,
  existClass,
  allParams,
};
