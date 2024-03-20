const { Router } = require("express");
const {
  postTypeClass,
  getTypeClassAll,
  getTypeClassId,
  putTypeClass,
  deleteTypeClass,
} = require("../handlers/typeClassHandler");
const typeClassRouter = Router();

typeClassRouter.post("/", postTypeClass);
typeClassRouter.get("/", getTypeClassAll);
typeClassRouter.get("/:idTypeClass", getTypeClassId);
typeClassRouter.put("/", putTypeClass);
typeClassRouter.delete("/:idTypeClass", deleteTypeClass);

module.exports = typeClassRouter;