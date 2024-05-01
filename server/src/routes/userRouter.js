const { Router } = require("express");
const {
  postUser,
  getUserAllOrPage,
  getUserId,
  putUser,
  deleteUser,
} = require("../handlers/userHandler");
const userRouter = Router();

userRouter.post("/", postUser);
userRouter.get("/", getUserAllOrPage);
userRouter.get("/:idUser", getUserId);
userRouter.put("/", putUser);
userRouter.delete("/:idUser", deleteUser);

module.exports = userRouter;
