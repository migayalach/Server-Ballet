require("dotenv").config();
const { URL } = process.env;
const URL_OPTION = require("./optionURL");

function nextPage(direction, page, pages, queryId) {
  if (pages === 1 || pages === page) {
    return null;
  }
  const request = URL_OPTION(direction, queryId);
  return `${URL}${request}${page + 1}`;
}

function prevPage(direction, page, queryId) {
  const pagePrev = page - 1;
  if (pagePrev === 0) {
    return null;
  }
  const request = URL_OPTION(direction, queryId);
  return `${URL}${request}${page - 1}`;
}

module.exports = {
  nextPage,
  prevPage,
};
