const { Router } = require("express");
const {
  getClassStudentAll,
  getClassStudentId,
  postClassStudent,
  deleteClassStudent,
  putStudent,
} = require("../handlers/classStudentHandler");
const classStudentRoute = Router();

// TODO ESTA RUTA MUESTRA TODO EL LISTADO DE ESTUDIANTES POR CLASE
classStudentRoute.get("/:idClass", getClassStudentId);
classStudentRoute.get("/", getClassStudentAll);
classStudentRoute.post("/", postClassStudent);
classStudentRoute.delete("/:idClass/:idUser", deleteClassStudent);
// studentRoute.put("/", putStudent);

module.exports = classStudentRoute;
