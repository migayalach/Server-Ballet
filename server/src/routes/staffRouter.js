const { Router } = require("express");
const {
  postStaff,
  getStaffAllOrPage,
  getStaffId,
  putStaff,
  deleteStaff,
} = require("../handlers/staffHandler");
const staffRouter = Router();

staffRouter.post("/", postStaff);
staffRouter.get("/", getStaffAllOrPage);
staffRouter.get("/:idStaff", getStaffId);
staffRouter.put("/", putStaff);
staffRouter.delete("/:idStaff", deleteStaff);

module.exports = staffRouter;
