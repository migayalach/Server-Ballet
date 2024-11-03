const { Router } = require("express");
const { getFilterUser, getIdUserData } = require("../handlers/filterHandler");
const filterRouter = Router();

filterRouter.get("/", getFilterUser);
// filterRouter.get("/:idUser", getIdUserData);

module.exports = filterRouter;
