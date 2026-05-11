const { AppError } = require("./errors");

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const parseId = (value, label = "id") => {
  const id = Number.parseInt(value, 10);
  if (!Number.isFinite(id)) {
    throw new AppError(`Invalid ${label}.`, 400);
  }
  return id;
};

module.exports = {
  isNonEmptyString,
  parseId,
};
