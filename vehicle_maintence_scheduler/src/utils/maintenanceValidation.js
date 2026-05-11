const { AppError } = require("./errors");
const { isNonEmptyString, isValidDateString, parseId } = require("./validationHelpers");

const ALLOWED_STATUS = new Set([
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
]);

const validateMaintenancePayload = (payload) => {
  const vehicleId = parseId(payload.vehicleId, "vehicle id");

  if (!isValidDateString(payload.scheduledDate)) {
    throw new AppError("Invalid scheduledDate.", 400);
  }

  if (!isNonEmptyString(payload.status) || !ALLOWED_STATUS.has(payload.status)) {
    throw new AppError("Invalid status.", 400);
  }

  return {
    vehicleId,
    scheduledDate: payload.scheduledDate,
    status: payload.status,
    notes: isNonEmptyString(payload.notes) ? payload.notes : null,
  };
};

const validateStatusUpdate = (payload) => {
  if (!isNonEmptyString(payload.status) || !ALLOWED_STATUS.has(payload.status)) {
    throw new AppError("Invalid status.", 400);
  }

  return {
    status: payload.status,
  };
};

module.exports = {
  validateMaintenancePayload,
  validateStatusUpdate,
  ALLOWED_STATUS,
};
