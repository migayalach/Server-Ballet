const { Router } = require("express");
const {
  postListContact,
  getListContactAll,
  getListContact,
  putListContact,
} = require("../handlers/contactHandler");

const contactRouter = Router();

contactRouter.post("/", postListContact);
contactRouter.get("/", getListContactAll);
contactRouter.get("/:idContact", getListContact);
contactRouter.put("/", putListContact);

module.exports = contactRouter;
