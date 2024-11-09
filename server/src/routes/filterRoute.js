const { Router } = require("express");
const { getFilterUser } = require("../handlers/filterHandler");
const filterRouter = Router();

filterRouter.get("/", getFilterUser);

module.exports = filterRouter;
