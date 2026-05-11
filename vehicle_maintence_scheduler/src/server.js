const http = require("http");
const app = require("./app");
const { Log } = require("../../logging_middleware/src");

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const logStartup = async (message, level = "info") => {
  await Log("backend", level, "service", message);
};

server.listen(PORT, async () => {
  await logStartup(`Vehicle maintenance scheduler listening on port ${PORT}.`);
});

server.on("error", async (error) => {
  await logStartup(`Server startup error: ${error.message}`, "error");
});
