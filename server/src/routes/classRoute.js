const { Router } = require("express");
const {
  postClass,
  getClassAll,
  getIdClass,
  putClass,
  deleteClass,
} = require("../handlers/classHandler");
const classRouter = Router();

classRouter.post("/", postClass);
classRouter.get("/", getClassAll);
classRouter.get("/:idClass", getIdClass);
classRouter.put("/", putClass);
classRouter.delete("/:idClass", deleteClass);

module.exports = classRouter;
