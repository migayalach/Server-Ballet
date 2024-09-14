const { isNumber } = require("../helpers/funcAux");
const { pagesCurrent, pageCurrent } = require("./currentPages");
const { nextPage, prevPage } = require("./pageNavegation");

let pages = 0;
const elementPage = 20;

function responseData(results, url, page, queryId) {
  // console.log(url, page, queryId);
  if (isNumber(page)) {
    throw Error(`There is nothing here`);
  } else if (isNaN(page)) {
    page = 1;
  }
  pages = pagesCurrent(results.length, elementPage);
  return {
    info: info(results, url, pageCurrent(+page, pages), queryId),
    results: resultData(results, pageCurrent(+page, pages)),
  };
}

function info(data, direction, page, queryId) {
  const count = data.length;
  pages = pagesCurrent(count, elementPage);
  return {
    count,
    pages,
    next: nextPage(direction, page, pages, queryId),
    prev: prevPage(direction, page, queryId),
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
