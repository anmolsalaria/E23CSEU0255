const { Log } = require("../../../logging_middleware/src");

const validateRequest = (validator, label = "request") => async (req, res, next) => {
  try {
    req.validatedBody = validator(req.body);
    await Log(
      "backend",
      "info",
      "middleware",
      `Validation passed for ${label}.`
    );
    next();
  } catch (error) {
    await Log(
      "backend",
      "warn",
      "middleware",
      `Validation failed for ${label}: ${error.message}`
    );
    next(error);
  }
};

module.exports = {
  validateRequest,
};
