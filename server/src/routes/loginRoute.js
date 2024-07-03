const { Router } = require("express");
const accessLogin = require("../handlers/loginHandler");
const loginRouter = Router();
const { validateLogin } = require("../middlewares/loginMiddleware");

loginRouter.post("/", validateLogin, accessLogin);

module.exports = loginRouter;
