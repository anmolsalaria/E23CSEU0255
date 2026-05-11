const { Log } = require("../../../logging_middleware/src");

const errorHandler = async (error, req, res, next) => {
  await Log("backend", "error", "middleware", `Unhandled error: ${error.message}`);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = {
  errorHandler,
};
