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
assistanceRouter.get("/", getAssistancePage);
assistanceRouter.put("/", validateUpdateAssistance, putAssistanceId);
assistanceRouter.delete(
  "/:idClass/:idAssistance",
  validateDeleteAssistance,
  deleteAssistance
);

module.exports = assistanceRouter;
