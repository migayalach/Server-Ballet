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
      return `class?idUser=${queryId}&page=`;
    case "params":
      return `params?page=`;
    case "filter":
      return `filter?page=`;
    case "attendance":
      return `attendance?idAssistance=${queryId}&page=`;
    case "assistance":
      return `assistance?idClass=${queryId}&page=`;
  }
}

module.exports = URL_OPTION;
