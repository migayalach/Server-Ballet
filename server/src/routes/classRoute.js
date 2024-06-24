const { Router } = require("express");
const {
  postClass,
  getClassAll,
  getIdClass,
  putClass,
  deleteClass,
} = require("../handlers/classHandler");
const classRouter = Router();

classRouter.get("/", getClassAll);
classRouter.post("/", postClass);
classRouter.put("/", putClass);
classRouter.delete("/:idUser/:idClass", deleteClass);
classRouter.get("/:idClass", getIdClass);

module.exports = classRouter;
