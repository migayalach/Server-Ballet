const { Router } = require("express");
const {
  postLevelMiddleware,
  putLevelMiddleware,
  deleteLevelMiddleware,
} = require("../middlewares/levelMiddleware");
const {
  postLevel,
  getLevelAll,
  getLevelId,
  putLevel,
  deleteLevel,
} = require("../handlers/levelHandler");
const levelRouter = Router();

levelRouter.post("/", postLevelMiddleware, postLevel);
levelRouter.get("/", getLevelAll);
levelRouter.get("/:idLevel", getLevelId);
levelRouter.put("/", putLevelMiddleware, putLevel);
levelRouter.delete("/:idLevel", deleteLevelMiddleware, deleteLevel);

module.exports = levelRouter;
