const express = require("express");
const { Log } = require("../../../logging_middleware/src");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await Log("backend", "info", "route", "Health check requested.");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
