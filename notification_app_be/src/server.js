require("dotenv").config();

const http = require("http");
const app = require("./app");
const { Log } = require("../../logging_middleware/src");

const PORT = process.env.PORT || 3002;
const server = http.createServer(app);

const logStartup = async (message, level = "info") => {
  await Log("backend", level, "service", message);
};

server.listen(PORT, async () => {
  console.log(`Notification service running on port ${PORT}`);
  await logStartup(`Notification service running on port ${PORT}.`);
});

server.on("error", async (error) => {
  console.error(`Notification service failed to start: ${error.message}`);
  await logStartup(`Server startup error: ${error.message}`, "error");
});
