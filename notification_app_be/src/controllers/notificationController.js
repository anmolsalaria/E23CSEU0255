const { Log } = require("../../../logging_middleware/src");
const {
  listNotifications,
  createNotification,
  markNotificationRead,
} = require("../services/notificationService");
const { parseId } = require("../utils/validationHelpers");
const { AppError } = require("../utils/errors");
const { sendSuccess } = require("../utils/response");

const getNotifications = async (req, res, next) => {
  try {
    await Log("backend", "info", "controller", "Fetching notifications.");
    const notifications = await listNotifications();
    sendSuccess(res, notifications, "Notifications retrieved.");
  } catch (error) {
    next(error);
  }
};

const createNotificationHandler = async (req, res, next) => {
  try {
    await Log("backend", "info", "controller", "Creating notification.");
    const notification = await createNotification(req.validatedBody);
    sendSuccess(res, notification, "Notification created.", 201);
  } catch (error) {
    next(error);
  }
};

const markReadHandler = async (req, res, next) => {
  try {
    const id = parseId(req.params.id, "notification id");
    const notification = await markNotificationRead(id);
    if (!notification) {
      throw new AppError("Notification not found.", 404);
    }

    await Log(
      "backend",
      "info",
      "controller",
      `Notification ${id} marked as read.`
    );

    sendSuccess(res, notification, "Notification marked as read.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  createNotificationHandler,
  markReadHandler,
};
