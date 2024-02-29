const { Router } = require("express");
const {
  postQualification,
  getQualificationAll,
  getQualificationId,
  putQualification,
  deleteQualification,
} = require("../handlers/qualification");
const qualificationRouter = Router();

qualificationRouter.post("/", postQualification);
qualificationRouter.get("/", getQualificationAll);
qualificationRouter.get("/:idQualification", getQualificationId);
qualificationRouter.put("/", putQualification);
qualificationRouter.delete("/:idQualification", deleteQualification);

module.exports = qualificationRouter;
