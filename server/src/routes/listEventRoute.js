const { Router } = require("express");
const {
  postListEvent,
  getListEventAll,
  getListEvent,
  putListEvent,
} = require("../handlers/listEventHandler");

const listEventRouter = Router();

listEventRouter.post("/", postListEvent);
listEventRouter.get("/", getListEventAll);
listEventRouter.get("/:idListEvent", getListEvent);
listEventRouter.put("/", putListEvent);

module.exports = listEventRouter;
