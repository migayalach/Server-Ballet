const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const assistanceRouter = require("./assistanceRoute");
const levelRouter = require("./levelRoute");
const extensionRouter = require("./extensionRoute");
const staffRouter = require("./staffRouter");
const hoursRouter = require("./hoursRoute");
const typeClassRouter = require("./typeClassRoute");
const studentRouter = require("./studentRoute");

// const classRouter = require("./classRoute");
// const paymentRouter = require("./paymentRoute");
// const qualificationRouter = require("./qualificationRoute");

// ENTRY POINT'S
mainRouter.use("/level", levelRouter);
mainRouter.use("/asistance", assistanceRouter);
mainRouter.use("/extension", extensionRouter);
mainRouter.use("/staff", staffRouter);
mainRouter.use("/hours", hoursRouter);
mainRouter.use("/typeClass", typeClassRouter);
mainRouter.use("/student", studentRouter);

// mainRouter.use("/class", classRouter);
// mainRouter.use("/payment", paymentRouter);
// mainRouter.use("/qualification", qualificationRouter);

module.exports = mainRouter;
