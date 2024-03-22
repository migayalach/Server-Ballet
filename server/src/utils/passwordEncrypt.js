const bcrypt = require("bcrypt");

const hashedPassword = async (password) => await bcrypt.hash(password, 10);

module.exports = hashedPassword;
