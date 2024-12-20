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
const passwordRouter = require("./_passwordRoute");
const allDataRouter = require("./allDataRoute");
const downloadRouter = require("./downloadRoute");
const filterRouter = require("./filterRoute");

// ENTRY POINT'S
mainRouter.use("/level", levelRouter);
mainRouter.use("/extension", extensionRouter);
mainRouter.use("/typeClass", typeClassRouter);
mainRouter.use("/hours", hoursRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/contact", sendContactRouter);
mainRouter.use("/listEvents", listEventRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/class", classRouter);
mainRouter.use("/classStudent", classStudentRouter);
mainRouter.use("/params", paramsRouter);
mainRouter.use("/allData", allDataRouter);
mainRouter.use("/change", passwordRouter);
mainRouter.use("/qualification", qualificationRouter);
mainRouter.use("/download", downloadRouter);
mainRouter.use("/assistance", assistanceRouter);
mainRouter.use("/attendance", attendanceRouter);
mainRouter.use("/filter", filterRouter);

module.exports = mainRouter;
