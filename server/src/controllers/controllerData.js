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

module.exports = {
  allLevel,
  existIdLevel,
  repeatedLevel,
  allExtension,
  repeatedNameExtension,
  repeatedExtension,
  allHours,
  existIdHours,
  allTypeClass,
  matchNameClass,
  existIdTypeClass,
};
