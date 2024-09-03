const { isNumber } = require("../../helpers/funcAux");
const { pagesCurrent, pageCurrent } = require("../currentPages");
const { nextPage, prevPage } = require("./pageFIlterNavegation");

let pages = 0;
const elementPage = 20;

function responseFilterData(flag, results, page, queryId) { 
  if (isNumber(page)) {
    throw Error(`There is nothing here`);
  } else if (isNaN(page)) {
    page = 1;
  }
  pages = pagesCurrent(results.length, elementPage);

  return {
    info: infoFilter(results, pageCurrent(+page, pages), queryId, flag),
    results: resultFilterData(results, pageCurrent(+page, pages)),
  };
}

function infoFilter(data, page, queryId, flag) {
  const count = data.length;
  pages = pagesCurrent(count, elementPage);
  return {
    count,
    pages,
    next: nextPage(page, pages, queryId, flag),
    prev: prevPage(page, queryId, flag, flag),
  };
}

function resultFilterData(array, page) {
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

module.exports = responseFilterData;
