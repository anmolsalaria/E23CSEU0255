const { AppError } = require("./errors");
const { isNonEmptyString } = require("./validationHelpers");

const ALLOWED_TYPES = new Set(["info", "warning", "success", "error"]);

const validateNotificationPayload = (payload) => {
  if (!isNonEmptyString(payload.title)) {
    throw new AppError("Missing or invalid title.", 400);
  }

  if (!isNonEmptyString(payload.message)) {
    throw new AppError("Missing or invalid message.", 400);
  }

  if (!isNonEmptyString(payload.type) || !ALLOWED_TYPES.has(payload.type)) {
    throw new AppError("Invalid notification type.", 400);
  }

  return {
    title: payload.title,
    message: payload.message,
    type: payload.type,
  };
};

module.exports = {
  validateNotificationPayload,
};
