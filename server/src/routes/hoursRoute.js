const { Router } = require("express");
const {
  postHours,
  getHoursAllPage,
  getHoursId,
  putHours,
  deleteHours,
} = require("../handlers/hoursHandler");
const {
  postHoursMiddleware,
  putHoursMiddleware,
  idHoursMiddleware,
} = require("../middlewares/hoursMiddleware");
const hoursRouter = Router();

hoursRouter.post("/", postHoursMiddleware, postHours);
hoursRouter.get("/", getHoursAllPage);
hoursRouter.get("/:idHours", idHoursMiddleware, getHoursId);
hoursRouter.put("/", putHoursMiddleware, putHours);
hoursRouter.delete("/:idHours", idHoursMiddleware, deleteHours);

module.exports = hoursRouter;
