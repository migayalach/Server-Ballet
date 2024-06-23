const { Router } = require("express");
const {
  getQualificationAll,
  postQualification,
  // getQualificationId,
} = require("../handlers/qualificationHandler");
const qualificationRouter = Router();

qualificationRouter.get("/", getQualificationAll);
qualificationRouter.post("/", postQualification);
// qualificationRouter.get("/:idParams/:idUser", getQualificationId);

module.exports = qualificationRouter;
