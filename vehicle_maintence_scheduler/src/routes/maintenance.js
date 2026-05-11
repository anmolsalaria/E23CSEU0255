const express = require("express");
const {
  createMaintenanceHandler,
  getUpcomingMaintenanceHandler,
  updateMaintenanceStatusHandler,
} = require("../controllers/maintenanceController");
const { Log } = require("../../../logging_middleware/src");
const { validateRequest } = require("../middleware/validateRequest");
const {
  validateMaintenancePayload,
  validateStatusUpdate,
} = require("../utils/maintenanceValidation");

const router = express.Router();

router.post("/", validateRequest(validateMaintenancePayload, "maintenance create"), async (req, res, next) => {
  await Log("backend", "info", "route", "POST /maintenance requested.");
  return createMaintenanceHandler(req, res, next);
});

router.get("/upcoming", async (req, res, next) => {
  await Log("backend", "info", "route", "GET /maintenance/upcoming requested.");
  return getUpcomingMaintenanceHandler(req, res, next);
});

router.put("/:id/status", validateRequest(validateStatusUpdate, "maintenance status"), async (req, res, next) => {
  await Log(
    "backend",
    "info",
    "route",
    `PUT /maintenance/${req.params.id}/status requested.`
  );
  return updateMaintenanceStatusHandler(req, res, next);
});

module.exports = router;
