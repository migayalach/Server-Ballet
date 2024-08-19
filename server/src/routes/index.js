const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const levelRouter = require("./levelRoute"); //OK
const extensionRouter = require("./extensionRoute"); //OK
const userRouter = require("./userRouter"); //OK
const typeClassRouter = require("./typeClassRoute"); //OK
const hoursRouter = require("./hoursRoute"); //O
const classRouter = require("./classRoute"); //O
const loginRouter = require("./loginRoute"); //OK
const classStudentRouter = require("./classStudentRoute");
const filterRouter = require("./filterRoute");
const paramsRouter = require("./paramsRoute");
const qualificationRouter = require("./qualificationRoute");
const assistanceRouter = require("./assistanceRoute");
const attendanceRouter = require("./_attendanceRoute");
const listEventRouter = require("./listEventRoute");
const sendContactRouter = require("./contactDataRoute");
// const paymentRouter = require("./paymentRoute");

// ENTRY POINT'S
mainRouter.use("/level", levelRouter);
mainRouter.use("/extension", extensionRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/typeClass", typeClassRouter);
mainRouter.use("/hours", hoursRouter);
mainRouter.use("/class", classRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/classStudent", classStudentRouter);
mainRouter.use("/filter", filterRouter);
mainRouter.use("/params", paramsRouter);
mainRouter.use("/qualification", qualificationRouter);
mainRouter.use("/assistance", assistanceRouter);
mainRouter.use("/attendance", attendanceRouter);
mainRouter.use("/listEvents", listEventRouter);
mainRouter.use("/contact", sendContactRouter);
// mainRouter.use("/payment", paymentRouter);

module.exports = mainRouter;
