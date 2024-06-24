const { Router } = require("express");
const {
  postParams,
  getParamsId,
  deleteParams,
  putParams,
  // getParamsAllPage,
} = require("../handlers/paramsHandler");

const paramsRouter = Router();

paramsRouter.post("/", postParams);                       // OK
paramsRouter.get("/:idUser", getParamsId);                // OK
paramsRouter.put("/", putParams);                         // OK
paramsRouter.delete("/:idUser/:idParams", deleteParams);  // OK
// paramsRouter.get("/", getParamsAllPage);

module.exports = paramsRouter;
