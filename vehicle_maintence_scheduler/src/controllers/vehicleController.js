const { Log } = require("../../../logging_middleware/src");
const {
  listVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../services/vehicleService");
const { validateVehiclePayload } = require("../utils/vehicleValidation");
const { AppError } = require("../utils/errors");

const getAllVehicles = async (req, res, next) => {
  try {
    await Log("backend", "info", "controller", "Fetching all vehicles.");
    const vehicles = listVehicles();
    res.status(200).json({ data: vehicles });
  } catch (error) {
    next(error);
  }
};

const getVehicle = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      throw new AppError("Invalid vehicle id.", 400);
    }

    const vehicle = getVehicleById(id);
    if (!vehicle) {
      throw new AppError("Vehicle not found.", 404);
    }

    await Log("backend", "info", "controller", `Fetched vehicle ${id}.`);
    res.status(200).json({ data: vehicle });
  } catch (error) {
    next(error);
  }
};

const createVehicleHandler = async (req, res, next) => {
  try {
    validateVehiclePayload(req.body);
    const vehicle = createVehicle(req.body);
    await Log("backend", "info", "controller", `Created vehicle ${vehicle.id}.`);
    res.status(201).json({ data: vehicle });
  } catch (error) {
    next(error);
  }
};

const updateVehicleHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      throw new AppError("Invalid vehicle id.", 400);
    }

    validateVehiclePayload(req.body);
    const vehicle = updateVehicle(id, req.body);
    if (!vehicle) {
      throw new AppError("Vehicle not found.", 404);
    }

    await Log("backend", "info", "controller", `Updated vehicle ${id}.`);
    res.status(200).json({ data: vehicle });
  } catch (error) {
    next(error);
  }
};

const deleteVehicleHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      throw new AppError("Invalid vehicle id.", 400);
    }

    const removed = deleteVehicle(id);
    if (!removed) {
      throw new AppError("Vehicle not found.", 404);
    }

    await Log("backend", "info", "controller", `Deleted vehicle ${id}.`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVehicles,
  getVehicle,
  createVehicleHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
};
