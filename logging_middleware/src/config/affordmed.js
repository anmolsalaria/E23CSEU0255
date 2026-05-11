require("./env");

const affordmedConfig = {
  authUrl: process.env.AFFORDMED_AUTH_URL,
  logUrl: process.env.AFFORDMED_LOG_URL,
  clientId: process.env.AFFORDMED_CLIENT_ID,
  clientSecret: process.env.AFFORDMED_CLIENT_SECRET,
  companyName: process.env.AFFORDMED_COMPANY_NAME,
  ownerName: process.env.AFFORDMED_OWNER_NAME,
  ownerEmail: process.env.AFFORDMED_OWNER_EMAIL,
  ownerRollNo: process.env.AFFORDMED_OWNER_ROLL_NO,
};

module.exports = {
  affordmedConfig,
};
