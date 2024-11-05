const { Router } = require("express");
const { getFilterUser, getIdUserData } = require("../handlers/filterHandler");
const filterRouter = Router();

filterRouter.get("/", getFilterUser);

module.exports = filterRouter;
