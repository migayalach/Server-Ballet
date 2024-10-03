const { Router } = require("express");
const changePasswordHandler = require("../handlers/_passwordHandler");

const passwordRoute = Router();

passwordRoute.post("/", changePasswordHandler);

module.exports = passwordRoute;
