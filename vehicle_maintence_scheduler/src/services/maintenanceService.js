const { Log } = require("../../../logging_middleware/src");
const { AppError } = require("../utils/errors");
const { getVehicleById } = require("./vehicleService");

const maintenanceItems = [];
let nextId = 1;

const createMaintenance = async (payload) => {
  await Log("backend", "info", "service", "Creating maintenance entry.");

  const vehicle = getVehicleById(payload.vehicleId);
  if (!vehicle) {
    throw new AppError("Vehicle not found.", 404);
  }

  const maintenance = {
    id: nextId,
    vehicleId: payload.vehicleId,
    scheduledDate: payload.scheduledDate,
    status: payload.status,
    notes: payload.notes,
    createdAt: new Date().toISOString(),
  };

  nextId += 1;
  maintenanceItems.push(maintenance);

  await Log(
    "backend",
    "info",
    "service",
    `Maintenance ${maintenance.id} scheduled for vehicle ${maintenance.vehicleId}.`
  );

  return maintenance;
};

const listUpcomingMaintenance = async () => {
  const now = Date.now();
  const upcoming = maintenanceItems.filter((item) => {
    const scheduled = Date.parse(item.scheduledDate);
    return (
      Number.isFinite(scheduled) &&
      scheduled >= now &&
      item.status !== "completed" &&
      item.status !== "cancelled"
    );
  });

  await Log(
    "backend",
    "info",
    "service",
    `Upcoming maintenance count: ${upcoming.length}.`
  );

  return upcoming;
};

const updateMaintenanceStatus = async (id, status) => {
  await Log(
    "backend",
    "info",
    "service",
    `Updating maintenance ${id} status to ${status}.`
  );

  const maintenance = maintenanceItems.find((item) => item.id === id);
  if (!maintenance) {
    return null;
  }

  maintenance.status = status;
  return maintenance;
};

module.exports = {
  createMaintenance,
  listUpcomingMaintenance,
  updateMaintenanceStatus,
};
