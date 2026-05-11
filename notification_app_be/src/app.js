const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notificationsRouter = require("./routes/notifications");
const healthRouter = require("./routes/health");
const { errorHandler } = require("./middleware/errorHandler");
const { requestLogger } = require("./middleware/requestLogger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));
app.use(requestLogger);

app.use("/health", healthRouter);
app.use("/notifications", notificationsRouter);

app.use(errorHandler);

module.exports = app;
