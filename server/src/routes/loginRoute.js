const { Router } = require("express");
const accessLogin = require("../handlers/loginHandler");
const loginRouter = Router();

loginRouter.post("/", accessLogin);

module.exports = loginRouter;
