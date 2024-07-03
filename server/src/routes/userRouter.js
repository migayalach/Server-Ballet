const { Router } = require("express");
const {
  postUser,
  getUserAllOrPage,
  getUserId,
  putUser,
  deleteUser,
} = require("../handlers/userHandler");
const { postUserMiddleware } = require("../middlewares/userMiddleware");
const userRouter = Router();

userRouter.post("/", postUserMiddleware, postUser);
userRouter.get("/", getUserAllOrPage);
userRouter.get("/:idUser", getUserId);
userRouter.put("/", putUser);
userRouter.delete("/:idUser", deleteUser);

module.exports = userRouter;
