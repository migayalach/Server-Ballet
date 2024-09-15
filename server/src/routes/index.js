const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const loginRouter = require("./loginRoute");
const levelRouter = require("./levelRoute");
const extensionRouter = require("./extensionRoute");
const userRouter = require("./userRouter");
const typeClassRouter = require("./typeClassRoute");
const hoursRouter = require("./hoursRoute");
const classRouter = require("./classRoute");
const classStudentRouter = require("./classStudentRoute");
const paramsRouter = require("./paramsRoute");
const qualificationRouter = require("./qualificationRoute");
const assistanceRouter = require("./assistanceRoute");
const attendanceRouter = require("./_attendanceRoute");
const listEventRouter = require("./listEventRoute");
const sendContactRouter = require("./contactDataRoute");
const filterRouter = require("./filterRoute");

// ENTRY POINT'S
mainRouter.use("/level", levelRouter);                  //OK
mainRouter.use("/extension", extensionRouter);          //OK
mainRouter.use("/typeClass", typeClassRouter);          //OK
mainRouter.use("/hours", hoursRouter);                  //OK
mainRouter.use("/login", loginRouter);                  //OK
mainRouter.use("/contact", sendContactRouter);          //OK
mainRouter.use("/listEvents", listEventRouter);         //OK
mainRouter.use("/user", userRouter);                    //OK
mainRouter.use("/class", classRouter);                  //OK
mainRouter.use("/classStudent", classStudentRouter);    //OK
mainRouter.use("/params", paramsRouter);                //OK

mainRouter.use("/qualification", qualificationRouter);  //PROBAR CON EL FRONTEND *POR EL ATRUBUTO PAGE
mainRouter.use("/assistance", assistanceRouter);
mainRouter.use("/attendance", attendanceRouter);

// mainRouter.use("/filter", filterRouter);

module.exports = mainRouter;
 