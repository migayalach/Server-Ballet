const pool = require("../dataBase/conexion");
const {
  selectMaxLevel,
  countStaff,
  existExtension,
  matchCarnetStaff,
  matchEmail,
  allStaff,
  existIdLevel,
} = require("./controllerData");
const responseData = require("../utils/response");
const {
  isNumber,
  lengthName,
  isString,
  codeStaffStudent,
  completeStaffStudent,
  stateBoolean,
} = require("../helpers/funcAux");
const hashedPassword = require("../utils/passwordEncrypt");

const createStaff = async (
  idLevel,
  idExtension,
  nameStaff,
  lastNameStaff,
  emailStaff,
  addressStaff,
  dateBirthStaff,
  carnetStaff,
  photoStaff
) => {
  completeStaffStudent(
    idExtension,
    nameStaff,
    lastNameStaff,
    emailStaff,
    carnetStaff
  );
  if (!(await existExtension(idExtension))) {
    throw Error(`La extension que usted quiere asignar no existe`);
  }
  if (await matchEmail("staff", "emailStaff", emailStaff)) {
    throw Error(`No pueden haber emails repetidos`);
  }
  if (!(await matchCarnetStaff(carnetStaff))) {
    throw Error(`No se puede haber un carnet repetido`);
  }
  const password = await hashedPassword(
    codeStaffStudent(lastNameStaff, nameStaff, carnetStaff)
  );
  let level = 0;
  if (parseInt(await countStaff()) === 0) {
    level = await selectMaxLevel();
  } else {
    level = idLevel;
  }
  await pool.query(
    "INSERT INTO staff (idLevel, idExtension, nameStaff, lastNameStaff, emailStaff, passwordStaff, addressStaff, dateBirthStaff, carnetStaff, photoStaff) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      level,
      idExtension,
      nameStaff,
      lastNameStaff,
      emailStaff,
      password,
      addressStaff,
      dateBirthStaff,
      carnetStaff,
      photoStaff,
    ]
  );
  return await getAllStaff();
};

const getAllStaff = async () => {
  const page = 1;
  const response = await allStaff();
  return responseData(response, "staff", page);
};

const getPageStaff = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allStaff();
  return responseData(response, "staff", page);
};

const getIdStaff = async (idStaff) => {
  if (isNumber(idStaff)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const [data] = await pool.query(
    "SELECT s.idStaff, s.idLevel, l.nameLevel, s.idExtension, e.department, s.nameStaff,  s.lastNameStaff,  s.emailStaff,  s.passwordStaff,  s.addressStaff, s.dateBirthStaff,  s.carnetStaff,  s.photoStaff,  s.stateStaff FROM staff s, extension e, level l WHERE s.idStaff = ? AND s.idExtension = e.idExtension AND s.idLevel = l.idLevel ",
    [idStaff]
  );
  if (!data.length) {
    throw Error(`El usuario que usted busca no se encuentra registrado`);
  }
  return data[0];
};

const updateStaff = async (
  idStaff,
  idLevel,
  idExtension,
  nameStaff,
  lastNameStaff,
  emailStaff,
  passwordStaff,
  addressStaff,
  dateBirthStaff,
  carnetStaff,
  photoStaff,
  stateStaff
) => {
  completeStaffStudent(
    idExtension,
    nameStaff,
    lastNameStaff,
    emailStaff,
    carnetStaff
  );
  stateBoolean(stateStaff);
  if (isNaN(idStaff)) {
    throw Error(`Por favor ingrese el identificador del usuario`);
  }
  if (isNaN(idLevel)) {
    throw Error("Por favor ingrese el nivel que quiere asignar");
  }
  if (!(await existIdLevel(idLevel))) {
    throw Error(`El nivel que usted quiere asignar no se encuentra registrado`);
  }
  await getIdStaff(idStaff);
  if (!(await existExtension(idExtension))) {
    throw Error(`La extension que usted quiere asignar no existe`);
  }
  const password = await hashedPassword(passwordStaff);
  await pool.query(
    "UPDATE staff SET idLevel = ?, idExtension = ?, nameStaff = ?, lastNameStaff = ?, emailStaff = ?, passwordStaff = ?, addressStaff = ?, dateBirthStaff = ?,  carnetStaff = ?, photoStaff = ?, stateStaff = ? WHERE idStaff = ?",
    [
      idLevel,
      idExtension,
      nameStaff,
      lastNameStaff,
      emailStaff,
      password,
      addressStaff,
      dateBirthStaff,
      carnetStaff,
      photoStaff,
      stateStaff,
      idStaff,
    ]
  );
  return await getIdStaff(idStaff);
};

const removeStaff = async (idStaff) => {
  if (isNumber(idStaff)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await pool.query("DELETE FROM staff WHERE idStaff = ? ", [idStaff]);
  return await getAllStaff();
};

module.exports = {
  createStaff,
  getAllStaff,
  getPageStaff,
  getIdStaff,
  updateStaff,
  removeStaff,
};
