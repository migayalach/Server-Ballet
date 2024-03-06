function responseData(results) {
  return {
    info: info(results),
    results: results,
  };
}

function info(data) {
  return { count: "num", pages: "pages", next: "next", prev: "prev" };
}

module.exports = {
  responseData,
};
