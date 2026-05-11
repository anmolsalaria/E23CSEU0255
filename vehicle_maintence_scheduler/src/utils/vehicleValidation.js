const { AppError } = require("./errors");

const requiredFields = [
  "vehicleNumber",
  "ownerName",
  "model",
  "serviceDueDate",
  "status",
];

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isValidDateString = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
};

const validateVehiclePayload = (payload) => {
  for (const field of requiredFields) {
    if (!isNonEmptyString(payload[field])) {
      throw new AppError(`Missing or invalid ${field}.`, 400);
    }
  }

  if (!isValidDateString(payload.serviceDueDate)) {
    throw new AppError("Invalid serviceDueDate.", 400);
  }
};

module.exports = {
  validateVehiclePayload,
};
