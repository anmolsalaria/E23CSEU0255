const express = require("express");
const {
  getNotifications,
  createNotificationHandler,
  markReadHandler,
} = require("../controllers/notificationController");
const { Log } = require("../../../logging_middleware/src");
const { validateRequest } = require("../middleware/validateRequest");
const { validateNotificationPayload } = require("../utils/notificationValidation");

const router = express.Router();

router.post("/", validateRequest(validateNotificationPayload, "notification create"), async (req, res, next) => {
  await Log("backend", "info", "route", "POST /notifications requested.");
  return createNotificationHandler(req, res, next);
});

router.get("/", async (req, res, next) => {
  await Log("backend", "info", "route", "GET /notifications requested.");
  return getNotifications(req, res, next);
});

router.patch("/:id/read", async (req, res, next) => {
  await Log(
    "backend",
    "info",
    "route",
    `PATCH /notifications/${req.params.id}/read requested.`
  );
  return markReadHandler(req, res, next);
});

module.exports = router;
