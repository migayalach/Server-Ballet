const { Router } = require("express");
const changePasswordHandler = require("../handlers/_passwordHandler");
const passwordCases = require("../middlewares/passwordMiddleware");

const passwordRoute = Router();

passwordRoute.post("/", passwordCases, changePasswordHandler);

module.exports = passwordRoute;
