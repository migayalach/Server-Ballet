const { Router } = require("express");
const {
  validateGetQuaAll,
  validatePostQua,
} = require("../middlewares/qualificationMiddleware");
const {
  getQualificationAll,
  postQualification,
} = require("../handlers/qualificationHandler");
const qualificationRouter = Router();

qualificationRouter.get("/", validateGetQuaAll, getQualificationAll);
qualificationRouter.post("/", validatePostQua, postQualification);

module.exports = qualificationRouter;
