require("./env");

const baseUrl = process.env.BASE_URL;

const affordmedConfig = {
  baseUrl,
  authUrl: baseUrl ? `${baseUrl.replace(/\/$/, "")}/auth` : null,
  logUrl: baseUrl ? `${baseUrl.replace(/\/$/, "")}/log` : null,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessCode: process.env.ACCESS_CODE,
  ownerName: process.env.NAME,
  ownerEmail: process.env.EMAIL,
  ownerRollNo: process.env.ROLL_NO,
};

module.exports = {
  affordmedConfig,
};
