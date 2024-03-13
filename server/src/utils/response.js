const { toNumber } = require("../helpers/funcAux");
const { pagesCurrent, pageCurrent } = require("./currentPages");
const { nextPage, prevPage } = require("./pageNavegation");
let pages = 0;
const elementPage = 20;

function responseData(results, url, page) {
  if (!toNumber(page)) {
    throw Error(`There is nothing here`);
  } else if (isNaN(page)) {
    page = 1;
  }
  return {
    info: info(results, url, pageCurrent(+page, pages)),
    results: resultData(results, pageCurrent(+page, pages)),
  };
}

function info(data, direction, page) {
  const count = data.length;
  pages = pagesCurrent(count, elementPage);
  return {
    count,
    pages,
    next: nextPage(direction, page, pages),
    prev: prevPage(direction, page, pages),
  };
}

function resultData(array, page) {
  const aux = [];
  let count = 0;
  for (let i = 0; i < page; i++) {
    for (let j = 0; j < elementPage; j++) {
      if (i + 1 === page && array[count] !== undefined) {
        aux.push(array[count]);
      }
      count++;
    }
  }
  return aux;
}

module.exports = responseData;
