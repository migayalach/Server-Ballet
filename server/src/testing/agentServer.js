const server = require("../app");
const session = require("supertest");
const agent = session(server);

module.exports = agent;