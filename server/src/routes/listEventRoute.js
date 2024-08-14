const { Router } = require("express");
const {
  postListEvent,
  getListEventAll,
  getListEvent,
  putListEvent,
  deleteListEvent,
} = require("../handlers/listEventHandler");

const listEventRouter = Router();

listEventRouter.post("/", postListEvent);
listEventRouter.get("/", getListEventAll);
listEventRouter.get("/:idListEvent", getListEvent);
listEventRouter.put("/", putListEvent);
listEventRouter.delete("/:idListEvent", deleteListEvent);

module.exports = listEventRouter;
