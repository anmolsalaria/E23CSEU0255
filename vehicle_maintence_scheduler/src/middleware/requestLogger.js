const { Log } = require("../../../logging_middleware/src");

const requestLogger = async (req, res, next) => {
  await Log(
    "backend",
    "info",
    "middleware",
    `Incoming request: ${req.method} ${req.originalUrl}`
  );
  next();
};

module.exports = {
  requestLogger,
};
