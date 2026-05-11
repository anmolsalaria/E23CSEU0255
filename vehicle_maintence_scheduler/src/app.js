const express = require("express");
const healthRouter = require("./routes/health");
const vehiclesRouter = require("./routes/vehicles");
const { errorHandler } = require("./middleware/errorHandler");
const { requestLogger } = require("./middleware/requestLogger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/health", healthRouter);
app.use("/vehicles", vehiclesRouter);

app.use(errorHandler);

module.exports = app;
