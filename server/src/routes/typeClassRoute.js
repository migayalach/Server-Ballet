const { Router } = require("express");
const {
  postTypeClass,
  getTypeClassAll,
  getTypeClassId,
  putTypeClass,
  deleteTypeClass,
} = require("../handlers/typeClassHandler");
const {
  postTypeClassMiddleware,
  putTypeClassMiddleware,
  idTypeClassMiddleware,
} = require("../middlewares/typeClassMiddleware");
const typeClassRouter = Router();

typeClassRouter.post("/", postTypeClassMiddleware, postTypeClass);
typeClassRouter.get("/", getTypeClassAll);
typeClassRouter.get("/:idTypeClass", idTypeClassMiddleware, getTypeClassId);
typeClassRouter.put("/", putTypeClassMiddleware, putTypeClass);
typeClassRouter.delete("/:idTypeClass", idTypeClassMiddleware, deleteTypeClass);

module.exports = typeClassRouter;
