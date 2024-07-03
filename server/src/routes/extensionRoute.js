const { Router } = require("express");
const {
  postExtension,
  getExtensionAll,
  putExtension,
  deleteExtension,
} = require("../handlers/extensionHandler");
const extensionRouter = Router();
const {
  postExtensionMiddleware,
  putExtensionMiddleware,
  deleteExtensionMiddleware,
} = require("../middlewares/extensionMiddleware");

extensionRouter.post("/", postExtensionMiddleware, postExtension);
extensionRouter.get("/", getExtensionAll);
extensionRouter.put("/", putExtensionMiddleware, putExtension);
extensionRouter.delete(
  "/:idExtension",
  deleteExtensionMiddleware,
  deleteExtension
);

module.exports = extensionRouter;
