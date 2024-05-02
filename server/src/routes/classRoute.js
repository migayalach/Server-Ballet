const { Router } = require("express");
const {
  postClass,
  getClassAll,
  putClass,
  deleteClass,
} = require("../handlers/classHandler");
const classRouter = Router();

classRouter.post("/", postClass);
classRouter.get("/", getClassAll);
classRouter.put("/", putClass);
classRouter.delete("/:idClass", deleteClass);

module.exports = classRouter;
