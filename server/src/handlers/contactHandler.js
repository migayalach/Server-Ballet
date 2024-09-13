const {
  createContact,
  getAllContact,
  getPageContact,
  getIdContact,
  updateContact,
} = require("../controllers/contactController");

// TODO: CREAR UN NUEVO CONTACTO UTILIZANDO 'nameContact, emailContact, phoneContact' PROPORCIONADO POR EL BODY DE LA SOLICITUD
const postListContact = async (request, response) => {
  const { nameContact, emailContact, phoneContact } = request.body;
  try {
    const data = await createContact(
      nameContact,
      emailContact,
      phoneContact
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNA LA LISTA COMPLETA DE GENTE QUE DESEA SER CONTACTADA O LOS DATOS PAGINADOS SI SE PROPORCIONA EL PARÁMETRO DE CONSULTA 'page'
const getListContactAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = !page ? await getAllContact() : await getPageContact(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: RETORNAR EL CONTACTO BUSCADO POR 'idContact' EN LOS PARÁMETROS DE LA RUTA
const getListContact = async (request, response) => {
  const { idContact } = request.params;
  try {
    const data = await getIdContact(idContact);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// TODO: EDITA UN CONTACTO UTILIZANDO 'idContact, stateContact, feedback' PROPORCIONADO POR EL BODY DE LA SOLICITUD
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
