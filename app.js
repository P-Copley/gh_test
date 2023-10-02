const express = require("express");
const {
  getSnacks,
  getSnackById,
  postSnack,
} = require("./controllers/snacks.controllers");
const { getWelcomeMessage } = require("./controllers/api.controllers");
const {
  handlePSQLErrors,
  handleCustomErrors,
  handle500Errors,
} = require("./controllers/errors.controller");

const app = express();

app.use(express.json());
//valid paths
app.get("/api", getWelcomeMessage);
app.get("/api/snacks", getSnacks);
app.get("/api/snacks/:snack_id", getSnackById);
app.post("/api/snacks", postSnack);

// not found
app.all("/*", (req, res, next) => {
  res.status(404).send({ message: "path not found!!" });
});

// Error handling middleware
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
