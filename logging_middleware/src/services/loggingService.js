const axios = require("axios");
const { affordmedConfig } = require("../config/affordmed");
const { getAuthToken } = require("./authService");
const { validateLogInput } = require("../utils/validators");

const buildLogPayload = (stack, level, packageName, message) => ({
  stack,
  level,
  package: packageName,
  message,
});

const Log = async (stack, level, packageName, message) => {
  const validationError = validateLogInput(
    stack,
    level,
    packageName,
    message
  );
  if (validationError) {
    return { success: false, error: validationError };
  }

  if (!affordmedConfig.logUrl) {
    return { success: false, error: "Missing log API URL." };
  }

  const token = await getAuthToken();
  if (!token) {
    return { success: false, error: "Authentication failed." };
  }

  try {
    await axios.post(affordmedConfig.logUrl, buildLogPayload(stack, level, packageName, message), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Log delivery failed." };
  }
};

module.exports = {
  Log,
};
