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
paramsRouter.get("/:idUser", validateIdParams, getParamsId);
paramsRouter.delete("/:idUser/:idParams", validateDeleteParams, deleteParams);
paramsRouter.put("/", validateUpdateParams, putParams);
paramsRouter.get("/", getParamsAllPage);

module.exports = paramsRouter;
