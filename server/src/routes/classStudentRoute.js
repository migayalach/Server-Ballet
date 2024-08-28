const { Router } = require("express");

const {
  validategetIdClassStu,
  validatePostClassStu,
  validateDeleteClassStu,
} = require("../middlewares/classStudentMiddleware");

const {
  getClassStudentAll,
  getClassStudentId,
  postClassStudent,
  deleteClassStudent,
  putStudent,
} = require("../handlers/classStudentHandler");

const classStudentRoute = Router();

// TODO ESTA RUTA MUESTRA TODO EL LISTADO DE ESTUDIANTES POR CLASE
classStudentRoute.get("/:idClass", validategetIdClassStu, getClassStudentId);
classStudentRoute.get("/", getClassStudentAll);
classStudentRoute.post("/", validatePostClassStu, postClassStudent);
// TODO FALTA REALIZAR DELETE EN EL FRONTEND
classStudentRoute.delete(
  "/:idClass/:idUser",
  validateDeleteClassStu,
  deleteClassStudent
);

module.exports = classStudentRoute;
