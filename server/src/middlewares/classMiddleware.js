const {
  dataId,
  stateCase,
  lengthString,
  nameString,
} = require("./funAuxMiddleware");

const postClassMiddleware = (request, response, next) => {
  const { idUserCreate, idHours, idUser, idTypeClass, parallel } = request.body;
  const idUserAllClass = dataId(+idUserCreate);
  if (!idUserAllClass.state) {
    return response.status(400).json({
      message: `Se necesita un miembro del staff con acceso para mostrar los datos`,
    });
  }

  const typeIdHour = dataId(+idHours);
  if (!typeIdHour.state) {
    return response.status(400).json({ message: `Se necesita una hora` });
  }

  const typeIdUser = dataId(+idUser);
  if (!typeIdUser.state) {
    return response.status(400).json({ message: `Se necesita un usuario` });
  }

  const typeIdTypeClass = dataId(+idTypeClass);
  if (!typeIdTypeClass.state) {
    return response
      .status(400)
      .json({ message: `Se necesita un tipo de clase` });
  }

  const parallelLength = lengthString(parallel);
  if (!parallelLength.state) {
    return response
      .status(400)
      .json({ message: `${parallelLength.message} el paralelo` });
  }

  const paralleNumber = nameString(parallel);
  if (!paralleNumber.state) {
    return response.status(400).json({
      message: `El nombre del paralelo no debe ser un numero`,
    });
  }

  next();
};

const putClassMiddleware = (request, response, next) => {
  const { idClass, idHours, idUser, idTypeClass, parallel, stateClass } =
    request.body;
  
  const classId = dataId(+idClass);
  if (!classId.state) {
    return response.status(400).json({
      message: classId.message,
    });
  }

  const typeIdHour = dataId(+idHours);
  if (!typeIdHour.state) {
    return response.status(400).json({ message: `Se necesita una hora` });
  }

  const typeIdUser = dataId(+idUser);
  if (!typeIdUser.state) {
    return response.status(400).json({ message: `Se necesita un usuario` });
  }

  const typeIdTypeClass = dataId(+idTypeClass);
  if (!typeIdTypeClass.state) {
    return response
      .status(400)
      .json({ message: `Se necesita un tipo de clase` });
  }

  const parallelLength = lengthString(parallel);
  if (!parallelLength.state) {
    return response
      .status(400)
      .json({ message: `${parallelLength.message} el paralelo` });
  }

  const paralleNumber = nameString(parallel);
  if (!paralleNumber.state) {
    return response.status(400).json({
      message: `El nombre del paralelo no debe ser un numero`,
    });
  }

  const stateValue = stateCase(stateClass);
  if (!stateValue.state) {
    return response.status(400).json({ message: stateValue.message });
  }

  next();
};

const getIdClassMiddleware = (request, response, next) => {
  const { idClass } = request.params;
  const typeId = dataId(+idClass);
  if (!typeId.state) {
    return response.status(400).json({ message: typeId.message });
  }
  next();
};

const getPageClassQuery = (request, response, next) => {
  const { page } = request.params;
  const pageNum = dataId(+page);
  if (!pageNum.state) {
    return response.status(400).json({ message: typeId.message });
  }
  next();
};

const deleteClassMiddleware = (request, response, next) => {
  const { idUser, idClass } = request.params;
  const typeIdUser = dataId(+idUser);
  if (!typeIdUser.state) {
    return response.status(400).json({ message: `Se necesita un usuario` });
  }

  const typeIdClass = dataId(+idClass);
  if (!typeIdClass.state) {
    return response.status(400).json({ message: `Se necesita una clase` });
  }
  next();
};

const paramsQuery = (request, response, next) => {
  const { page, idUser } = request.query;
  if (!page && idUser) {
    const typeId = dataId(+idUser);
    if (!typeId.state) {
      return response.status(400).json({ message: typeId.message });
    }
  } else if (page && idUser) {
    const typeId = dataId(+idUser);
    if (!typeId.state) {
      return response.status(400).json({ message: typeId.message });
    }
    const pageNum = dataId(+page);
    if (!pageNum.state) {
      return response.status(400).json({ message: pageNum.message });
    }
  }
  next();
};

module.exports = {
  postClassMiddleware,
  putClassMiddleware,
  getIdClassMiddleware,
  getPageClassQuery,
  deleteClassMiddleware,
  paramsQuery,
};
