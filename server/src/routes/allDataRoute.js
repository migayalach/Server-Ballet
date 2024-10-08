const { Router } = require("express");
const allDataHandler = require("../handlers/allDataHandler");

const allDataRoute = Router();

allDataRoute.get("/", allDataHandler);

module.exports = allDataRoute;