const ALLOWED_STACKS = new Set(["backend", "frontend"]);
const ALLOWED_LEVELS = new Set(["debug", "info", "warn", "error", "fatal"]);
const ALLOWED_PACKAGES = new Set([
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  "auth",
  "config",
  "middleware",
  "utils",
]);

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const validateLogInput = (stack, level, packageName, message) => {
  if (!isNonEmptyString(stack) || !ALLOWED_STACKS.has(stack)) {
    return "Invalid stack value.";
  }

  if (!isNonEmptyString(level) || !ALLOWED_LEVELS.has(level)) {
    return "Invalid level value.";
  }

  if (!isNonEmptyString(packageName) || !ALLOWED_PACKAGES.has(packageName)) {
    return "Invalid package value.";
  }

  if (!isNonEmptyString(message)) {
    return "Invalid message value.";
  }

  return null;
};

module.exports = {
  validateLogInput,
};
