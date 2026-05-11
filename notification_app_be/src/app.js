const express = require("express");
const notificationsRouter = require("./routes/notifications");
const { errorHandler } = require("./middleware/errorHandler");
const { requestLogger } = require("./middleware/requestLogger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/notifications", notificationsRouter);

app.use(errorHandler);

module.exports = app;
