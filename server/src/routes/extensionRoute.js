const { Router } = require("express");
const {
  postExtension,
  getExtensionAll,
  putExtension,
  deleteExtension,
} = require("../handlers/extensionHandler");
const extensionRouter = Router();

extensionRouter.post("/", postExtension);
extensionRouter.get("/", getExtensionAll);
extensionRouter.put("/", putExtension);
extensionRouter.delete("/:idExtension", deleteExtension);

module.exports = extensionRouter;
