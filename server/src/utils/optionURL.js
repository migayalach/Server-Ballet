function URL_OPTION(option) {
  switch (option) {
    case "level":
      return `level?page=`;
    case "extension":
      return `extension?page=`;
    case "hours":
      return `hours?page=`;
    case "typeClass":
      return `typeClass?page=`;
    case "student":
      return `student?page=`;
    case "staff":
      return `staff?page=`;
    case "class":
      return `class?page=`;
  }
}

module.exports = URL_OPTION;
