function pagesCurrent(count, elementPage) {
  return Math.ceil(count / elementPage);
}

function pageCurrent(page, pages) {
  if (page <= 1) {
    return 1;
  } else if (page > pages) {
    throw Error(`There is nothing here`);
  }
  return page;
}

module.exports = {
  pagesCurrent,
  pageCurrent,
};
