const { Router } = require("express");
const {
  postHours,
  getHoursAllPage,
  getHoursId,
  putHours,
  deleteHours,
} = require("../handlers/hoursHandler");
const hoursRouter = Router();

hoursRouter.post("/", postHours);
hoursRouter.get("/", getHoursAllPage);
hoursRouter.get("/:idHours", getHoursId);
hoursRouter.put("/", putHours);
hoursRouter.delete("/:idHours", deleteHours);

module.exports = hoursRouter;
