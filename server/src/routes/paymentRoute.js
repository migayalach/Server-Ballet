const { Router } = require("express");
const {
  postPayment,
  getPaymentAll,
  getPaymentId,
  putPayment,
  deletePayment,
} = require("../handlers/paymentHandler");
const paymentRouter = Router();

paymentRouter.post("/", postPayment);
paymentRouter.get("/", getPaymentAll);
paymentRouter.get("/:idPayment", getPaymentId);
paymentRouter.put("/", putPayment);
paymentRouter.delete("/:idPayment", deletePayment);

module.exports = paymentRouter;
