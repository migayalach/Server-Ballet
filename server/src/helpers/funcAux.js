function isNumber(idElement) {
  if (isNaN(idElement)) {
    return true;
  }
  return false;
}

function isString(idElement) {
  if (typeof idElement === "string") {
    return true;
  }
  return false;
}

function lengthName(nameLevel) {
  if (!nameLevel.length) {
    return false;
  }
  return true;
}

function lengthElderForElementents(nameExtension) {
  if (nameExtension.length > 4) {
    return false;
  }
  return true;
}

function levelExist(idLevel) {
  if (idLevel) {
    return false;
  }
  return true;
}

function extensionExist(idExtension) {
  if (idExtension) {
    return false;
  }
  return true;
}

function userRepeated(carnetStaff) {
  if (carnetStaff) {
    return false;
  }
  return true;
}

function dateComplete(startTime, endTime, totalTime) {
  if (isString(startTime) && isString(endTime) && isString(totalTime)) {
    if (startTime.length && endTime.length && totalTime.length) {
      return true;
    }
    throw Error("Solo se aceptan horas completas");
  }
  throw Error(`Por favor ingrese las horas solicitadas`);
}

function codeUser(nameUser, lastNameUser, carnetUser) {
  const name = nameUser.split(" ", 1);
  const [first, second] = lastNameUser.split(" ");
  const firstLastName = first[0];
  const secondLastName = second[0];
  const carnet = carnetUser.toString().slice(0, 3);
  return `${name}${firstLastName}${secondLastName}.${carnet}`;
}

function completeUser(idExtension, name, lastName, email, carnet) {
  if (isNumber(idExtension) || isString(idExtension)) {
    throw Error(`Por favor asigne una extension`);
  }
  if (!isString(name) || !lengthName(name)) {
    throw Error(`Por introduzca un nombre`);
  }
  if (!isString(lastName) || !lengthName(lastName)) {
    throw Error(`Por favor introduzca los apellidos`);
  }
  if (!isString(email) || !lengthName(email)) {
    throw Error(`Por favor introduzca el email`);
  }
  if (isNumber(carnet) || isString(carnet)) {
    throw Error(`Por favor introduzca el numero de carnet`);
  }
  return true;
}

function stateBoolean(state) {
  if (typeof state === "boolean") {
    return true;
  }
  throw Error(`Por favor asigne un estado`);
}

function stateUserClass(idUser, listData) {
  let state = null;
  listData.forEach((element) => {
    if (element.idUser === idUser) {
      state = element.stateStudent;
    }
  });
  return state;
}

function averangeUser(idUser, listData) {
  let averange = 0;
  listData.forEach((element) => {
    if (element.idUser === idUser) {
      averange += element.note;
    }
  });
  return averange;
}

function totalNoteAndState(listStudents, listData) {
  for (let i = 0; i < listStudents.length; i++) {
    listStudents[i].stateStudent = stateUserClass(
      listStudents[i].idUser,
      listData
    );
    listStudents[i].note = averangeUser(listStudents[i].idUser, listData);
  }
  return listStudents;
}

function orderListCourse(array, state, order) {
  array = array.filter((index) => index.stateStudent === +state);
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (order === "ASC") {
        if (array[i].note > array[j].note) {
          let aux = array[i];
          array[i] = array[j];
          array[j] = aux;
        }
      } else if (order === "DESC") {
        if (array[i].note < array[j].note) {
          let aux = array[i];
          array[i] = array[j];
          array[j] = aux;
        }
      }
    }
  }
  return array;
}

const clearDataList = (data) =>
  data.map(
    ({
      idUser,
      nameUser,
      lastNameUser,
      carnetUser,
      department,
      emailUser,
      numberPhone,
      photoUser,
      stateStudent,
    }) => ({
      idUser,
      nameUser,
      lastNameUser,
      carnetUser,
      department,
      emailUser,
      numberPhone,
      photoUser,
      stateStudent,
      note: 0,
    })
  );

module.exports = {
  isNumber,
  isString,
  lengthName,
  lengthElderForElementents,
  levelExist,
  extensionExist,
  userRepeated,
  dateComplete,
  codeUser,
  completeUser,
  stateBoolean,
  totalNoteAndState,
  orderListCourse,
  clearDataList,
};
