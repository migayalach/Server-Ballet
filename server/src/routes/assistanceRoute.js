const { Router } = require("express");

const {
  validatePostAssistance,
  validateIdAssistance,
  validateUpdateAssistance,
  validateDeleteAssistance,
} = require("../middlewares/assistanceMiddleware");

const {
  postNewAssistance,
  getAssistanceIdClass,
  getAssistancePage,
  putAssistanceId,
  deleteAssistance,
} = require("../handlers/assistanceHandler");

const assistanceRouter = Router();

assistanceRouter.post("/", validatePostAssistance, postNewAssistance);
assistanceRouter.get("/:idClass", validateIdAssistance, getAssistanceIdClass);
assistanceRouter.put("/", validateUpdateAssistance, putAssistanceId);
assistanceRouter.delete(
  "/:idClass/:idAssistance",
  validateDeleteAssistance,
  deleteAssistance
);
assistanceRouter.get("/", getAssistancePage);

module.exports = assistanceRouter;
