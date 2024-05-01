const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const levelRouter = require("./levelRoute");
const extensionRouter = require("./extensionRoute");
const userRouter = require("./userRouter");
const typeClassRouter = require("./typeClassRoute");
const hoursRouter = require("./hoursRoute");
const classRouter = require("./classRoute");
const loginRouter = require("./loginRoute");
const studentRouter = require("./studentRoute");

// const qualificationRouter = require("./qualificationRoute");
// const assistanceRouter = require("./assistanceRoute");
// const paymentRouter = require("./paymentRoute");

// ENTRY POINT'S
mainRouter.use("/level", levelRouter);
mainRouter.use("/extension", extensionRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/typeClass", typeClassRouter);
mainRouter.use("/hours", hoursRouter);
mainRouter.use("/class", classRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/student", studentRouter);

// mainRouter.use("/qualification", qualificationRouter);
// mainRouter.use("/payment", paymentRouter);
// mainRouter.use("/asistance", assistanceRouter);

module.exports = mainRouter;
