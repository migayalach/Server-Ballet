const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const assistanceRouter = require("./assistanceRoute");
const classRouter = require("./classRoute");
const levelRouter = require("./levelRoute");
const paymentRouter = require("./paymentRoute");
const qualificationRouter = require("./qualificationRoute");
const userRouter = require("./userRoute");

// ENTRY POINT'S
mainRouter.use("/asistance", assistanceRouter);
mainRouter.use("/class", classRouter);
mainRouter.use("/level", levelRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/qualification", qualificationRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;
