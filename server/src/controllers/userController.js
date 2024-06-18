const pool = require("../dataBase/conexion");
const responseData = require("../utils/response");
const {
  isNumber,
  lengthName,
  isString,
  codeUser,
  completeUser,
  stateBoolean,
} = require("../helpers/funcAux");
const hashedPassword = require("../utils/passwordEncrypt");
const {
  selectMaxLevel,
  countUser,
  existExtension,
  matchCarnetUser,
  matchEmail,
  allUser,
  existIdLevel,
} = require("./controllerData");

//TODO CREACION DE USUARIO NUEVO
const createUser = async (
  idLevel,
  idExtension,
  nameUser,
  lastNameUser,
  emailUser,
  addressUser,
  dateBirthUser,
  carnetUser,
  photoUser
) => {
  completeUser(idExtension, nameUser, lastNameUser, emailUser, carnetUser);
  if (!(await existExtension(idExtension))) {
    throw Error(`La extension que usted quiere asignar no existe`);
  }
  if (await matchEmail("user", "emailUser", emailUser)) {
    throw Error(`No pueden haber emails repetidos`);
  }
  if (!(await matchCarnetUser(carnetUser))) {
    throw Error(`No se puede haber un carnet repetido`);
  }
  const password = await hashedPassword(
    codeUser(lastNameUser, nameUser, carnetUser)
  );
  let level = 0;
  if (parseInt(await countUser()) === 0) {
    level = await selectMaxLevel();
  } else {
    level = idLevel;
  }
  const [ResultSetHeader] = await pool.query(
    "INSERT INTO user (idLevel, idExtension, nameUser, lastNameUser, emailUser, passwordUser, addressUser, dateBirthUser, carnetUser, photoUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      level,
      idExtension,
      nameUser,
      lastNameUser,
      emailUser,
      password,
      addressUser,
      dateBirthUser,
      carnetUser,
      photoUser,
    ]
  );
  const userData = await getIdUser(ResultSetHeader.insertId);
  const infoData = await getAllUser();
  return { userData, infoData, state: "create" };
};

const getAllUser = async () => {
  const page = 1;
  const response = await allUser();
  return responseData(response, "user", page);
};

const getPageUser = async (page) => {
  if (isNumber(page)) {
    throw Error(`El numero de pagina debe ser un numero`);
  }
  const response = await allUser();
  return responseData(response, "user", page);
};

// TODO MOSTRAR USUARIO POR ID
const getIdUser = async (idUser) => {
  if (isNumber(idUser)) {
    throw Error(`El parametro debe ser un numero`);
  }
  const [data] = await pool.query(
    "SELECT s.idUser, s.idLevel, l.nameLevel, s.idExtension, e.department, s.nameUser,  s.lastNameUser,  s.emailUser,  s.passwordUser,  s.addressUser, s.dateBirthUser,  s.carnetUser,  s.photoUser,  s.stateUser FROM user s, extension e, level l WHERE s.idUser = ? AND s.idExtension = e.idExtension AND s.idLevel = l.idLevel ",
    [idUser]
  );
  if (!data.length) {
    throw Error(`El usuario que usted busca no se encuentra registrado`);
  }
  return data[0];
};

// TODO EDITAR USUARIO
const updateUser = async (
  idUser,
  idLevel,
  idExtension,
  nameUser,
  lastNameUser,
  emailUser,
  passwordUser,
  addressUser,
  dateBirthUser,
  carnetUser,
  stateUser
) => {
  completeUser(idExtension, nameUser, lastNameUser, emailUser, carnetUser);
  if (isNaN(idUser)) {
    throw Error(`Por favor ingrese el identificador del usuario`);
  }
  if (isNaN(idLevel)) {
    throw Error("Por favor ingrese el nivel que quiere asignar");
  }
  if (!(await existIdLevel(idLevel))) {
    throw Error(`El nivel que usted quiere asignar no se encuentra registrado`);
  }
  await getIdUser(idUser);
  if (!(await existExtension(idExtension))) {
    throw Error(`La extension que usted quiere asignar no existe`);
  }
  if (!passwordUser) {
    await pool.query(
      "UPDATE user SET idLevel = ?, idExtension = ?, nameUser = ?, lastNameUser = ?, emailUser = ?, addressUser = ?, dateBirthUser = ?,  carnetUser = ?, stateUser = ? WHERE idUser = ?",
      [
        idLevel,
        idExtension,
        nameUser,
        lastNameUser,
        emailUser,
        addressUser,
        dateBirthUser,
        carnetUser,
        stateUser,
        idUser,
      ]
    );
    return await getIdUser(idUser);
  } else if (passwordUser.length >= 8) {
    const password = await hashedPassword(passwordUser);
    await pool.query(
      "UPDATE user SET idLevel = ?, idExtension = ?, nameUser = ?, lastNameUser = ?, emailUser = ?, passwordUser = ?, addressUser = ?, dateBirthUser = ?,  carnetUser = ?, stateUser = ? WHERE idUser = ?",
      [
        idLevel,
        idExtension,
        nameUser,
        lastNameUser,
        emailUser,
        password,
        addressUser,
        dateBirthUser,
        carnetUser,
        stateUser,
        idUser,
      ]
    );
    return await getIdUser(idUser);
  }
};

// TODO ELIMINAR USUARIO
const removeUser = async (idUser) => {
  if (isNumber(idUser)) {
    throw Error(`El parametro debe ser un numero`);
  }
  await pool.query("DELETE FROM user WHERE idUser = ? ", [idUser]);
  const infoData = await getAllUser();
  return { infoData, state: "delete" };
};

module.exports = {
  createUser,
  getAllUser,
  getPageUser,
  getIdUser,
  updateUser,
  removeUser,
};
