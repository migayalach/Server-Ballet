const { Router } = require("express");

const {
  validategetIdClassStu,
  validatePostClassStu,
} = require("../middlewares/classStudentMiddleware");

const {
  getClassStudentAll,
  getClassStudentId,
  postClassStudent,
  putClassStudent,
} = require("../handlers/classStudentHandler");

const classStudentRoute = Router();

// TODO ESTA RUTA MUESTRA TODO EL LISTADO DE ESTUDIANTES POR CLASE
classStudentRoute.get("/:idClass/:idUser?", validategetIdClassStu, getClassStudentId);
classStudentRoute.get("/", getClassStudentAll);
classStudentRoute.post("/", validatePostClassStu, postClassStudent);
classStudentRoute.put("/", validatePostClassStu, putClassStudent);

module.exports = classStudentRoute;
