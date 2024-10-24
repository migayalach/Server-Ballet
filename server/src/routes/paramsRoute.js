const { Router } = require("express");
const {
  validatePostParams,
  validateIdParams,
  validateUpdateParams,
  validateDeleteParams,
} = require("../middlewares/paramsMiddleware");

const {
  postParams,
  getParamsId,
  deleteParams,
  putParams,
  getParamsAllPage,
} = require("../handlers/paramsHandler");

const paramsRouter = Router();

paramsRouter.post("/", validatePostParams, postParams);
paramsRouter.get("/:idClass/:idParams?", validateIdParams, getParamsId);
paramsRouter.delete("/:idClass/:idParams", validateDeleteParams, deleteParams);
paramsRouter.put("/", validateUpdateParams, putParams);
paramsRouter.get("/", getParamsAllPage);

module.exports = paramsRouter;
