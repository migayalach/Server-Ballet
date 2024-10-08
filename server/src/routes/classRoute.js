const { Router } = require("express");
const {
  postClass,
  getClassAll,
  getIdClass,
  putClass,
  deleteClass,
} = require("../handlers/classHandler");
const {
  postClassMiddleware,
  putClassMiddleware,
  getIdClassMiddleware,
  getPageClassQuery,
  deleteClassMiddleware,
  paramsQuery,
} = require("../middlewares/classMiddleware");
const classRouter = Router();

classRouter.get("/", paramsQuery, getClassAll);
classRouter.post("/", postClassMiddleware, postClass);
classRouter.put("/", putClassMiddleware, putClass);
classRouter.delete("/:idUser/:idClass", deleteClassMiddleware, deleteClass);
classRouter.get("/:idClass", getIdClassMiddleware, getIdClass);

module.exports = classRouter;
