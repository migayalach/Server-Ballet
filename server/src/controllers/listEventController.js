const createListEvent = async (dateNews, body, urlPicture) => {
  return `${dateNews} - ${body} - ${urlPicture}`;
};

const getAllListEvent = async () => {
  return "I'm get all";
};

const getPageListEvent = async (page) => {
  return `${page}`;
};

const getIdListEvent = async (idListEvent) => {
  return `${idListEvent}`;
};

const updateListEvent = async (idListEvent, dateNews, body, urlPicture) => {
  return `${idListEvent} - ${dateNews} - ${body} - ${urlPicture} `;
};

const removeListEvent = async (idListEvent) => {
  console.log(idListEvent);
  return `${idListEvent}`;
};

module.exports = {
  createListEvent,
  getAllListEvent,
  getPageListEvent,
  getIdListEvent,
  updateListEvent,
  removeListEvent,
};
