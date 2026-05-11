const { AppError } = require("./errors");

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isValidDateString = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
};

const parseId = (value, label = "id") => {
  const id = Number.parseInt(value, 10);
  if (!Number.isFinite(id)) {
    throw new AppError(`Invalid ${label}.`, 400);
  }
  return id;
};

module.exports = {
  isNonEmptyString,
  isValidDateString,
  parseId,
};
