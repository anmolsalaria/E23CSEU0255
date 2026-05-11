const { Log } = require("../../../logging_middleware/src");
const {
  createMaintenance,
  listUpcomingMaintenance,
  updateMaintenanceStatus,
} = require("../services/maintenanceService");
const {
  validateMaintenancePayload,
  validateStatusUpdate,
} = require("../utils/maintenanceValidation");
const { parseId } = require("../utils/validationHelpers");
const { AppError } = require("../utils/errors");
const { sendSuccess } = require("../utils/response");

const createMaintenanceHandler = async (req, res, next) => {
  try {
    await Log("backend", "info", "controller", "Scheduling maintenance.");
    const payload = validateMaintenancePayload(req.body);
    const maintenance = await createMaintenance(payload);
    sendSuccess(res, maintenance, "Maintenance scheduled.", 201);
  } catch (error) {
    next(error);
  }
};

const getUpcomingMaintenanceHandler = async (req, res, next) => {
  try {
    await Log("backend", "info", "controller", "Fetching upcoming maintenance.");
    const upcoming = await listUpcomingMaintenance();
    sendSuccess(res, upcoming, "Upcoming maintenance retrieved.");
  } catch (error) {
    next(error);
  }
};

const updateMaintenanceStatusHandler = async (req, res, next) => {
  try {
    const id = parseId(req.params.id, "maintenance id");
    const status = validateStatusUpdate(req.body);

    const maintenance = await updateMaintenanceStatus(id, status);
    if (!maintenance) {
      throw new AppError("Maintenance not found.", 404);
    }

    await Log(
      "backend",
      "info",
      "controller",
      `Updated maintenance ${id} status.`
    );

    sendSuccess(res, maintenance, "Maintenance status updated.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMaintenanceHandler,
  getUpcomingMaintenanceHandler,
  updateMaintenanceStatusHandler,
};
