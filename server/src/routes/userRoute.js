const { Router } = require("express");
const {
  postUser,
  getUserAll,
  getUserId,
  putUser,
  deleteUser,
} = require("../handlers/userHandler");
const userRouter = Router();

userRouter.post("/", postUser);
userRouter.get("/", getUserAll);
userRouter.get("/:idUser", getUserId);
userRouter.put("/", putUser);
userRouter.delete("/:idUser", deleteUser);

module.exports = userRouter;
