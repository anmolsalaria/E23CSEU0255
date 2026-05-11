const axios = require("axios");
const { affordmedConfig } = require("../config/affordmed");

let cachedToken = null;
let cachedTokenExpiresAt = 0;

const buildAuthPayload = () => ({
  clientId: affordmedConfig.clientId,
  clientSecret: affordmedConfig.clientSecret,
  accessCode: affordmedConfig.accessCode,
  ownerName: affordmedConfig.ownerName,
  ownerEmail: affordmedConfig.ownerEmail,
  ownerRollNo: affordmedConfig.ownerRollNo,
});

const getTokenFromResponse = (data) =>
  data?.access_token || data?.accessToken || data?.token || null;

const getExpiryFromResponse = (data) => {
  const expiresIn = data?.expires_in || data?.expiresIn;
  if (typeof expiresIn === "number" && Number.isFinite(expiresIn)) {
    return Date.now() + Math.max(expiresIn - 30, 0) * 1000;
  }
  return Date.now() + 5 * 60 * 1000;
};

const isTokenValid = () =>
  cachedToken && cachedTokenExpiresAt > Date.now() + 5000;

const authenticate = async () => {
  if (!affordmedConfig.authUrl) {
    return null;
  }

  try {
    const response = await axios.post(
      affordmedConfig.authUrl,
      buildAuthPayload(),
      { timeout: 5000 }
    );

    const token = getTokenFromResponse(response.data);
    if (!token) {
      return null;
    }

    cachedToken = token;
    cachedTokenExpiresAt = getExpiryFromResponse(response.data);
    return cachedToken;
  } catch (error) {
    return null;
  }
};

const getAuthToken = async () => {
  if (isTokenValid()) {
    return cachedToken;
  }

  return authenticate();
};

module.exports = {
  getAuthToken,
};
