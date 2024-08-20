const { Router } = require("express");
const {
  validateGetQuaAll,
  validatePostQua,
} = require("../middlewares/qualificationMiddleware");
const {
  getQualificationAll,
  postQualification,
  // getQualificationId,
} = require("../handlers/qualificationHandler");
const qualificationRouter = Router();

qualificationRouter.get("/", validateGetQuaAll, getQualificationAll);
qualificationRouter.post("/", validatePostQua, postQualification);
// qualificationRouter.get("/:idParams/:idUser", getQualificationId);

module.exports = qualificationRouter;
