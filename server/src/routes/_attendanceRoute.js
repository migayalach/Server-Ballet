const { Router } = require("express");
const {
  postAttendance,
  getAllAttendanceDate,
  getAttendancePage,
} = require("../handlers/attendanceHandler");

const attendanceRouter = Router();

attendanceRouter.post("/", postAttendance);
attendanceRouter.get("/:idAssistance/:flag?", getAllAttendanceDate);
attendanceRouter.get("/", getAttendancePage);

module.exports = attendanceRouter;
