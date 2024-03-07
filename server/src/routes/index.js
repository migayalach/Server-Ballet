const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const assistanceRouter = require("./assistanceRoute");
const classRouter = require("./classRoute");
const levelRouter = require("./levelRoute");
const paymentRouter = require("./paymentRoute");
const qualificationRouter = require("./qualificationRoute");
const userRouter = require("./userRoute");
const extensionRouter = require("./extensionRoute");

// ENTRY POINT'S
mainRouter.use("/asistance", assistanceRouter);
mainRouter.use("/class", classRouter);
mainRouter.use("/level", levelRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/qualification", qualificationRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/extension", extensionRouter);

module.exports = mainRouter;
