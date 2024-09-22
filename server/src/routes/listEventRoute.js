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
  deleteListEvent
} = require("../handlers/listEventHandler");

const listEventRouter = Router();

listEventRouter.post("/", validateList, postListEvent);
listEventRouter.get("/", getListEventAll);
listEventRouter.get("/:idListEvent", validateIdContact, getListEvent);
listEventRouter.put("/", validateResContact, putListEvent);
listEventRouter.delete("/:idListEvent", validateIdContact, deleteListEvent);

module.exports = listEventRouter;
