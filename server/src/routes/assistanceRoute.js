const { Router } = require("express");
const {
  postNewAssistance,
  getAssistanceIdClass,
  getAssistancePage,
  putAssistanceId,
  deleteAssistance,
} = require("../handlers/assistanceHandler");
const assistanceRouter = Router();

assistanceRouter.post("/", postNewAssistance);
assistanceRouter.get("/:idClass", getAssistanceIdClass);
assistanceRouter.get("/", getAssistancePage);
assistanceRouter.put("/", putAssistanceId);
assistanceRouter.delete("/:idClass/:idAssistance", deleteAssistance);

module.exports = assistanceRouter;
