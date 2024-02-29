const { Router } = require("express");
const {
  postClass,
  getClassAll,
  getClassId,
  putClass,
  deleteClass,
} = require("../handlers/classHandler");
const classRouter = Router();

classRouter.post("/", postClass);
classRouter.get("/", getClassAll);
classRouter.get("/:idClass", getClassId);
classRouter.put("/", putClass);
classRouter.delete("/:idClass", deleteClass);

module.exports = classRouter;
