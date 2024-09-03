require("dotenv").config();
const { URL } = process.env;

function queryIdObject(queryId, page, operation, flag) {
  let search = "";
  for (let i in queryId) {
    if (queryId[i]) {
      search += `${i}=${queryId[i]}&`;
    }
  }
  return operation === "+"
    ? `${URL}filter?flag=${flag}&${search}page=${page + 1}`
    : `${URL}filter?flag=${flag}&${search}page=${page - 1}`;
}

function nextPage(page, pages, queryId, flag) {
  if (pages === 1 || pages === page) {
    return null;
  }
  return queryIdObject(queryId, page, "+", flag);
}

function prevPage(page, queryId, flag) {
  const pagePrev = page - 1;
  if (pagePrev === 0) {
    return null;
  }
  return queryIdObject(queryId, page, "-", flag);
}

module.exports = {
  nextPage,
  prevPage,
};
