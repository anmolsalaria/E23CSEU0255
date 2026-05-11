const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const healthRouter = require("./routes/health");
const vehiclesRouter = require("./routes/vehicles");
const maintenanceRouter = require("./routes/maintenance");
const { errorHandler } = require("./middleware/errorHandler");
const { requestLogger } = require("./middleware/requestLogger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));
app.use(requestLogger);

app.use("/health", healthRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/maintenance", maintenanceRouter);

app.use(errorHandler);

module.exports = app;
