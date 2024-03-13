function URL_OPTION(option) {
  switch (option) {
    case "level":
      return `level?page=`;
  }
}

module.exports = URL_OPTION;
