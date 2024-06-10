const { Router } = require("express");
const {
  postQualification,
  getQualificationAll,
  getQualificationId,
  putQualification,
  deleteQualification,
} = require("../handlers/qualificationHandler");
const qualificationRouter = Router();

qualificationRouter.post("/", postQualification);
qualificationRouter.get("/", getQualificationAll);
qualificationRouter.get("/:idUser", getQualificationId);
qualificationRouter.put("/", putQualification);
qualificationRouter.delete("/:idQualification", deleteQualification);

module.exports = qualificationRouter;
