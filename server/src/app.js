const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/academy", mainRouter);

module.exports = app;