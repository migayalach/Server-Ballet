const { Router } = require("express");
const {
  postListContact,
  getListContactAll,
  getListContact,
  putListContact,
} = require("../handlers/contactHandler");

const {
  validateContact,
  validateIdContact,
  validateResContact,
} = require("../middlewares/contactMiddleware");

const contactRouter = Router();

contactRouter.post("/", validateContact, postListContact);
contactRouter.get("/", getListContactAll);
contactRouter.get("/:idContact", validateIdContact, getListContact);
contactRouter.put("/", validateResContact, putListContact);

module.exports = contactRouter;
