const { Router } = require("express");
const {
  postStudent,
  getStudentAll,
  getStudentId,
  putStudent,
  deleteStudent,
} = require("../handlers/studentHandler");
const studentRoute = Router();

studentRoute.post("/", postStudent);
studentRoute.get("/", getStudentAll);
studentRoute.get("/:idStudent", getStudentId);
studentRoute.put("/", putStudent);
studentRoute.delete("/:idStudent", deleteStudent);

module.exports = studentRoute;
