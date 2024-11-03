const { isNumber } = require("../helpers/funcAux");
const { pagesCurrent, pageCurrent } = require("./currentPages");
const { nextPage, prevPage } = require("./pageNavegation");
const { URL } = process.env;

let pages = 0;
const elementPage = 20;

function responseFilter(results, search, data, page) {
  if (isNumber(page)) {
    throw Error(`There is nothing here`);
  } else if (isNaN(page)) {
    page = 1;
  }
  pages = pagesCurrent(results.length, elementPage);
  return {
    info: infoFilter(results, search, data, pageCurrent(+page, pages)),
    results: resultData(results, pageCurrent(+page, pages)),
  };
}

function responseData(results, url, page, queryId) {
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

const current = (flag, page, pages, direction, objSearch) => {
  if (flag === "+") {
    const num = page === pages ? null : page + 1;
    return num === null
      ? null
      : `${URL}filter?search=${direction}&data=${encodeURIComponent(
          JSON.stringify(objSearch)
        )}&page=${num}`;
  } else {
    const num = page === 0 ? null : page - 1;
    return num === null || num === 0
      ? null
      : `${URL}filter?search=${direction}&data=${encodeURIComponent(
          JSON.stringify(objSearch)
        )}&page=${num}`;
  }
};

function infoFilter(data, direction, objSearch, page) {
  const count = data.length;
  pages = pagesCurrent(count, elementPage);
  return {
    count,
    pages,
    next: current("+", page, pages, direction, objSearch),
    prev: current("-", page, pages, direction, objSearch),
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

module.exports = { responseData, responseFilter };
