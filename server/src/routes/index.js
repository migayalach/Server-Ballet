const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const levelRouter = require("./levelRoute");
const extensionRouter = require("./extensionRoute");
const hoursRouter = require("./hoursRoute");
const typeClassRouter = require("./typeClassRoute");
const studentRouter = require("./studentRoute");
const staffRouter = require("./staffRouter");
const classRouter = require("./classRoute");
const loginRouter = require("./loginRoute");

// const assistanceRouter = require("./assistanceRoute");
// const paymentRouter = require("./paymentRoute");
// const qualificationRouter = require("./qualificationRoute");

// ENTRY POINT'S
mainRouter.use("/level", levelRouter);
mainRouter.use("/extension", extensionRouter);
mainRouter.use("/hours", hoursRouter);
mainRouter.use("/typeClass", typeClassRouter);
mainRouter.use("/student", studentRouter);
mainRouter.use("/staff", staffRouter);
mainRouter.use("/class", classRouter);
mainRouter.use("/login", loginRouter)

// mainRouter.use("/payment", paymentRouter);
// mainRouter.use("/asistance", assistanceRouter);
// mainRouter.use("/qualification", qualificationRouter);

module.exports = mainRouter;
