const express = require("express");
const { Log } = require("../../../logging_middleware/src");
const { sendSuccess } = require("../utils/response");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await Log("backend", "info", "route", "Health check requested.");
    sendSuccess(res, { status: "ok" }, "Health check ok.");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
