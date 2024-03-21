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
async function matchCarnetStudent(carnetStudent) {
  const [data] = await pool.query(
    "SELECT carnetStudent FROM student WHERE carnetStudent = ?",
    [carnetStudent]
  );
  if (!data.length) {
    return true;
  }
  return false;
}

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

async function allStudent() {
  const [data] = await pool.query("SELECT * FROM student");
  return data;
}

module.exports = {
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
  matchCarnetStudent,
  matchEmail,
  allStudent,
};
