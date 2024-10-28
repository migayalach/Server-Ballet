const { Router } = require("express");
const getGenerateArchive = require("../handlers/downloadHandler");

const downloadRouter = Router();

downloadRouter.get("/", getGenerateArchive);

module.exports = downloadRouter;
