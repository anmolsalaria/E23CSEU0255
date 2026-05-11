const { Log } = require("../../../logging_middleware/src");

const notifications = [];
let nextId = 1;

const listNotifications = async () => {
  await Log("backend", "info", "service", "Listing notifications.");
  return notifications;
};

const createNotification = async (payload) => {
  await Log("backend", "info", "service", "Creating notification.");

  const notification = {
    id: nextId,
    title: payload.title,
    message: payload.message,
    type: payload.type,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  nextId += 1;
  notifications.push(notification);

  await Log(
    "backend",
    "info",
    "service",
    `Notification ${notification.id} created.`
  );

  return notification;
};

const markNotificationRead = async (id) => {
  await Log(
    "backend",
    "info",
    "service",
    `Marking notification ${id} as read.`
  );

  const notification = notifications.find((item) => item.id === id);
  if (!notification) {
    return null;
  }

  notification.isRead = true;
  return notification;
};

module.exports = {
  listNotifications,
  createNotification,
  markNotificationRead,
};
