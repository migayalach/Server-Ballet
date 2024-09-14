require("dotenv").config();
const { URL } = process.env;
const URL_OPTION = require("./optionURL");

// TODO AGREGAR UN SWITCH PARA PODER CONTROLAR LAS URL DE LOS ENLACES
function queryIdObject(queryId, page, operation, direction) {
  let search = "";
  for (let i in queryId) {
    if (queryId[i]) {
      search += `${i}=${queryId[i]}&`;
    }
  }
  return operation === "+"
    ? `${URL}qualification?${search}page=${page + 1}`
    : `${URL}qualification?${search}page=${page - 1}`;
  // ? `${URL}filter?${search}page=${page + 1}`
  // : `${URL}filter?${search}page=${page - 1}`;
}

function nextPage(direction, page, pages, queryId) {
  if (pages === 1 || pages === page) {
    return null;
  }
  if (typeof queryId === "object") {
    return queryIdObject(queryId, page, "+", direction);
  }
  const request = URL_OPTION(direction, queryId);
  return `${URL}${request}${page + 1}`;
}

function prevPage(direction, page, queryId) {
  const pagePrev = page - 1;
  if (pagePrev === 0) {
    return null;
  }
  if (typeof queryId === "object") {
    return queryIdObject(queryId, page, "-", direction);
  }
  const request = URL_OPTION(direction, queryId);
  return `${URL}${request}${page - 1}`;
}

module.exports = {
  nextPage,
  prevPage,
};
