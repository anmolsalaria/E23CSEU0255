const { Log } = require("../../../logging_middleware/src");
const {
  listVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../services/vehicleService");
const { AppError } = require("../utils/errors");
const { parseId } = require("../utils/validationHelpers");
const { sendSuccess } = require("../utils/response");

const getAllVehicles = async (req, res, next) => {
  try {
    await Log("backend", "info", "controller", "Fetching all vehicles.");
    const vehicles = await listVehicles();
    sendSuccess(res, vehicles, "Vehicles retrieved.");
  } catch (error) {
    next(error);
  }
};

const getVehicle = async (req, res, next) => {
  try {
    const id = parseId(req.params.id, "vehicle id");

    const vehicle = await getVehicleById(id);
    if (!vehicle) {
      throw new AppError("Vehicle not found.", 404);
    }

    await Log("backend", "info", "controller", `Fetched vehicle ${id}.`);
    sendSuccess(res, vehicle, "Vehicle retrieved.");
  } catch (error) {
    next(error);
  }
};

const createVehicleHandler = async (req, res, next) => {
  try {
    const vehicle = await createVehicle(req.validatedBody);
    await Log("backend", "info", "controller", `Created vehicle ${vehicle.id}.`);
    sendSuccess(res, vehicle, "Vehicle created.", 201);
  } catch (error) {
    next(error);
  }
};

const updateVehicleHandler = async (req, res, next) => {
  try {
    const id = parseId(req.params.id, "vehicle id");

    const vehicle = await updateVehicle(id, req.validatedBody);
    if (!vehicle) {
      throw new AppError("Vehicle not found.", 404);
    }

    await Log("backend", "info", "controller", `Updated vehicle ${id}.`);
    sendSuccess(res, vehicle, "Vehicle updated.");
  } catch (error) {
    next(error);
  }
};

const deleteVehicleHandler = async (req, res, next) => {
  try {
    const id = parseId(req.params.id, "vehicle id");

    const removed = await deleteVehicle(id);
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
