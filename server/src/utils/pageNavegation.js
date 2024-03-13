require("dotenv").config();
const { URL } = process.env;
const URL_OPTION = require("./optionURL");

function nextPage(direction, page, pages) {
  if (pages === 1 || pages === page) {
    return null;
  }
  const request = URL_OPTION(direction);
  return `${URL}${request}${page + 1}`;
}

function prevPage(direction, page) {
  const pagePrev = page - 1;
  if (pagePrev === 0) {
    return null;
  }
  const request = URL_OPTION(direction);
  return `${URL}${request}${page - 1}`;
}

module.exports = {
  nextPage,
  prevPage,
};
