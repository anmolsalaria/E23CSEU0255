const { AppError } = require("./errors");
const { isNonEmptyString, isValidDateString } = require("./validationHelpers");

const requiredFields = [
  "vehicleNumber",
  "ownerName",
  "model",
  "serviceDueDate",
  "status",
];

const validateVehiclePayload = (payload) => {
  for (const field of requiredFields) {
    if (!isNonEmptyString(payload[field])) {
      throw new AppError(`Missing or invalid ${field}.`, 400);
    }
  }

  if (!isValidDateString(payload.serviceDueDate)) {
    throw new AppError("Invalid serviceDueDate.", 400);
  }

  return {
    vehicleNumber: payload.vehicleNumber,
    ownerName: payload.ownerName,
    model: payload.model,
    serviceDueDate: payload.serviceDueDate,
    status: payload.status,
  };
};

module.exports = {
  validateVehiclePayload,
};
