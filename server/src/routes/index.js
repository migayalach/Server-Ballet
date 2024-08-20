const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const loginRouter = require("./loginRoute"); //OK
const levelRouter = require("./levelRoute"); //OK
const extensionRouter = require("./extensionRoute"); //OK
const userRouter = require("./userRouter"); //OK
const typeClassRouter = require("./typeClassRoute"); //OK

const hoursRouter = require("./hoursRoute"); //O
const classRouter = require("./classRoute"); //O
const classStudentRouter = require("./classStudentRoute");//O
const paramsRouter = require("./paramsRoute"); //O
const qualificationRouter = require("./qualificationRoute"); //O
const assistanceRouter = require("./assistanceRoute"); //O
const attendanceRouter = require("./_attendanceRoute"); //O

const listEventRouter = require("./listEventRoute"); //OK
const sendContactRouter = require("./contactDataRoute"); //OK
const filterRouter = require("./filterRoute");

// ENTRY POINT'S
mainRouter.use("/level", levelRouter);
mainRouter.use("/extension", extensionRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/typeClass", typeClassRouter);
mainRouter.use("/hours", hoursRouter);
mainRouter.use("/class", classRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/classStudent", classStudentRouter);
mainRouter.use("/params", paramsRouter);
mainRouter.use("/qualification", qualificationRouter);
mainRouter.use("/assistance", assistanceRouter);
mainRouter.use("/attendance", attendanceRouter);
mainRouter.use("/listEvents", listEventRouter);
mainRouter.use("/contact", sendContactRouter);
mainRouter.use("/filter", filterRouter);

module.exports = mainRouter;
