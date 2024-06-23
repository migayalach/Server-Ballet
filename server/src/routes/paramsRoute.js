const { Router } = require("express");
const {
  postParams,
  getParamsId,
  // getParamsAllPage,
  putParams,
  // deleteParams,
} = require("../handlers/paramsHandler");

const paramsRouter = Router();

paramsRouter.post("/", postParams);                   // OK
paramsRouter.get("/:idUser", getParamsId);            // OK
paramsRouter.put("/", putParams);                     // EN PROCESO
// paramsRouter.get("/", getParamsAllPage);
// paramsRouter.delete("/:idParams", deleteParams);

module.exports = paramsRouter;
