const { createPool } = require("mysql2/promise");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const pool = createPool({
  host: DB_HOST || "localhost",
  user: DB_USER || "root",
  password: DB_PASSWORD || "",
  port: DB_PORT || 3001,
  database: DB_NAME || "balletJessica",
});

module.exports = pool;