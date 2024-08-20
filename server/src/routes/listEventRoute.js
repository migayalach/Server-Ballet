const { Router } = require("express");
const {
  validateList,
  validateIdContact,
  validateResContact,
} = require("../middlewares/listEventMiddleware");
const {
  postListEvent,
  getListEventAll,
  getListEvent,
  putListEvent,
} = require("../handlers/listEventHandler");

const listEventRouter = Router();

listEventRouter.post("/", validateList, postListEvent);
listEventRouter.get("/", getListEventAll);
listEventRouter.get("/:idListEvent", validateIdContact, getListEvent);
listEventRouter.put("/", validateResContact, putListEvent);

module.exports = listEventRouter;
