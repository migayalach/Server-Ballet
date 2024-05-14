function URL_OPTION(option, queryId) {
  switch (option) {
    case "level":
      return `level?page=`;
    case "extension":
      return `extension?page=`;
    case "hours":
      return `hours?page=`;
    case "typeClass":
      return `typeClass?page=`;
    case "classStudent":
      return `classStudent?idClass=${queryId}&page=`;
    case "user":
      return `user?page=`;
    case "class":
      return `class?page=`;
    case "filter":
      return `filter?page=`;
  }
}

module.exports = URL_OPTION;
