const { Router } = require("express");
const {
  postUser,
  getUserAllOrPage,
  getUserId,
  putUser,
  deleteUser,
} = require("../handlers/userHandler");
const {
  postUserMiddleware,
  deleteUserMiddleware,
  getIdUserMiddleware,
  putUserMiddleware,
} = require("../middlewares/userMiddleware");
const passwordCases = require("../middlewares/passwordMiddleware");
const userRouter = Router();

userRouter.post("/", postUserMiddleware, postUser);
userRouter.get("/", getUserAllOrPage);
userRouter.get("/:idUser", getIdUserMiddleware, getUserId);
userRouter.put("/", putUserMiddleware, putUser);
userRouter.delete("/:idUser", deleteUserMiddleware, deleteUser);

module.exports = userRouter;

// userRouter.put("/", putUserMiddleware, passwordCases, putUser);