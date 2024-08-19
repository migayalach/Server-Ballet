const {
  createContact,
  getAllContact,
  getPageContact,
  getIdContact,
  updateContact,
} = require("../controllers/contactController");

const postListContact = async (request, response) => {
  const { dateContact, nameContact, emailContact, phoneContact } = request.body;
  try {
    const data = await createContact(
      dateContact,
      nameContact,
      emailContact,
      phoneContact
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getListContactAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllContact() : await getPageContact(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getListContact = async (request, response) => {
  const { idContact } = request.params;
  try {
    const data = await getIdContact(idContact);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putListContact = async (request, response) => {
  const { idContact, stateContact, feedback } = request.body;
  try {
    const data = await updateContact(idContact, stateContact, feedback);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postListContact,
  getListContactAll,
  getListContact,
  putListContact,
};
