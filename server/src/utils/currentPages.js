function pagesCurrent(count, elementPage) {
  return Math.ceil(count / elementPage);
}

// TODO ARREGLAR ESTA LINEA PORQUE CUANDO SE HACE EL SALGO DE EJEMPLO 3 A 2 DEVUELVE THERE IS NOTHING HERE
function pageCurrent(page, pages) {
  if (page <= 1) {
    return 1;
  } else if (page <= pages) {
    return page;
  }
  throw Error(`There is nothing here`);
}

module.exports = {
  pagesCurrent,
  pageCurrent,
};
