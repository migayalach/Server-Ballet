const { Router } = require("express");
const {
  postParams,
  getParamsAllPage,
  getParamsId,
  putParams,
  deleteParams,
} = require("../handlers/paramsHandler");

const paramsRouter = Router();

paramsRouter.post("/", postParams);
paramsRouter.get("/", getParamsAllPage);
paramsRouter.get("/:idParams", getParamsId);
paramsRouter.put("/", putParams);
paramsRouter.delete("/:idParams", deleteParams);

module.exports = paramsRouter;
