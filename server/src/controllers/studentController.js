const pool = require("../dataBase/conexion");
const {
  existExtension,
  matchCarnetStudent,
  nameLevelData,
  matchEmail,
  allStudent,
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

const createStudent = async (
  idExtension,
  nameStudent,
  lastNameStudent,
  emailStudent,
  carnetStudent,
  addressStudent,
  dateBirthStudent,
  photoStudent
) => {
  completeStaffStudent(
    idExtension,
    nameStudent,
    lastNameStudent,
    emailStudent,
    +carnetStudent
  );
  if (!isString(addressStudent) || !lengthName(addressStudent)) {
    throw Error(`Por favor ingrese la direccion del estudiante`);
  }
  if (!isString(dateBirthStudent) || !lengthName(dateBirthStudent)) {
    throw Error(`Por favor ingrese la fecha de nacimiento`);
  }
  if (!(await existExtension(idExtension))) {
    throw Error(`La extension que usted quiere asignar no existe`);
  }
  if (await matchEmail("student", "carnetStudent", carnetStudent)) {
    throw Error(`No pueden haber emails repetidos`);
  }
  if (!(await matchCarnetStudent(carnetStudent))) {
    throw Error(`No se puede haber un carnet repetido`);
  }
  const code = codeStaffStudent(lastNameStudent, nameStudent, carnetStudent);
  const password = await hashedPassword(code);
  await pool.query(
    "INSERT INTO student (idLevel, idExtension, nameStudent, lastNameStudent, emailStudent, carnetStudent, addressStudent, dateBirthStudent, photoStudent, codeStudent, passwordStudent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      await nameLevelData("estudiante"),
      idExtension,
      nameStudent,
      lastNameStudent,
      emailStudent,
      carnetStudent,
      addressStudent,
      dateBirthStudent,
      photoStudent,
      code,
      password,
    ]
  );
  return await getAllStudent();
};

const getAllStudent = async () => {
  const page = 1;
  const response = await allStudent();
  return responseData(response, "student", page);
};

const getPageStudent = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allStudent();
  return responseData(response, "student", page);
};

const getIdStudent = async (idStudent) => {
  if (isNumber(idStudent)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const [data] = await pool.query(
    `SELECT s.idStudent, s.idLevel, l.nameLevel, s.idExtension, e.department, s.nameStudent, s.lastNameStudent, s.emailStudent, s.addressStudent, s.dateBirthStudent, s.carnetStudent, s.photoStudent, s.stateStudent FROM student s, level l, extension e WHERE s.idLevel = l.idLevel AND s.idExtension = e.idExtension AND s.idStudent = ?`,
    [idStudent]
  );
  if (!data.length) {
    throw Error(`El estudiante que usted busca no se encuentra registrado`);
  }
  return data[0];
};

const updateStudent = async (
  idStudent,
  idExtension,
  nameStudent,
  lastNameStudent,
  emailStudent,
  carnetStudent,
  addressStudent,
  dateBirthStudent,
  stateStudent
) => {
  completeStaffStudent(
    idExtension,
    nameStudent,
    lastNameStudent,
    emailStudent,
    carnetStudent
  );
  await getIdStudent(idStudent);
  if (!isString(addressStudent) || !lengthName(addressStudent)) {
    throw Error(`Por favor ingrese la direccion del estudiante`);
  }
  if (!isString(dateBirthStudent) || !lengthName(dateBirthStudent)) {
    throw Error(`Por favor ingrese la fecha de nacimiento`);
  }
  const code = codeStaffStudent(lastNameStudent, nameStudent, carnetStudent);
  await pool.query(
    "UPDATE student SET idExtension = ?, nameStudent = ?, lastNameStudent = ?, emailStudent = ?, carnetStudent = ?, addressStudent = ?, dateBirthStudent = ?, stateStudent = ?, codeStudent = ?  WHERE idStudent = ?",
    [
      idExtension,
      nameStudent,
      lastNameStudent,
      emailStudent,
      carnetStudent,
      addressStudent,
      dateBirthStudent,
      stateStudent,
      code,
      idStudent,
    ]
  );
  return await getIdStudent(idStudent);
};

const removeStudent = async (idStudent) => {
  if (isNumber(idStudent)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await getIdStudent(idStudent);
  await pool.query(`DELETE FROM student WHERE idStudent = ?`, [idStudent]);
  return await getAllStudent();
};

module.exports = {
  createStudent,
  getAllStudent,
  getIdStudent,
  getPageStudent,
  updateStudent,
  removeStudent,
};
