const { Router } = require("express");
const {
  postAssistance,
  getAssistanceAll,
  getAssistanceId,
  putAssistance,
  deleteAssistance,
} = require("../handlers/assistanceHandler");
const assistanceRouter = Router();

assistanceRouter.post("/", postAssistance);
assistanceRouter.get("/", getAssistanceAll);
assistanceRouter.get("/:idAssistance", getAssistanceId);
assistanceRouter.put("/", putAssistance);
assistanceRouter.delete("/:idAssistance", deleteAssistance);

module.exports = assistanceRouter;
