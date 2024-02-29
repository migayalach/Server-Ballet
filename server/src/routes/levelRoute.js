const { Router } = require("express");
const {
  postLevel,
  getLevelAll,
  getLevelId,
  putLevel,
  deleteLevel,
} = require("../handlers/levelHandler");
const levelRouter = Router();

levelRouter.post("/", postLevel);
levelRouter.get("/", getLevelAll);
levelRouter.get("/:idLevel", getLevelId);
levelRouter.put("/", putLevel);
levelRouter.delete("/:idLevel", deleteLevel);

module.exports = levelRouter;
