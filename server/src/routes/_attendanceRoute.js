const { Router } = require("express");

const {
  validatePostAttendance,
  validateGetIdAttendance,
} = require("../middlewares/attendanceMiddleware");

const {
  postAttendance,
  getAllAttendanceDate,
  getAttendancePage,
} = require("../handlers/attendanceHandler");

const attendanceRouter = Router();

attendanceRouter.post("/", validatePostAttendance, postAttendance);
attendanceRouter.get(
  "/:idAssistance/:flag?",
  validateGetIdAttendance,
  getAllAttendanceDate
);
attendanceRouter.get("/", getAttendancePage);

module.exports = attendanceRouter;
