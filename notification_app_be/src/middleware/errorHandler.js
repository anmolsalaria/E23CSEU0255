const { Log } = require("../../../logging_middleware/src");
const { AppError } = require("../utils/errors");

const errorHandler = async (error, req, res, next) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof AppError ? error.message : "Internal Server Error";

  await Log(
    "backend",
    "error",
    "middleware",
    `Error handling ${req.method} ${req.originalUrl}: ${message}`
  );

  res.status(statusCode).json({ error: message });
};

module.exports = {
  errorHandler,
};
