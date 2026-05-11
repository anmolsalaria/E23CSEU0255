const express = require("express");
const {
  getAllVehicles,
  getVehicle,
  createVehicleHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
} = require("../controllers/vehicleController");
const { validateRequest } = require("../middleware/validateRequest");
const { validateVehiclePayload } = require("../utils/vehicleValidation");
const { Log } = require("../../../logging_middleware/src");

const router = express.Router();

router.post(
  "/",
  validateRequest(validateVehiclePayload, "vehicle create"),
  async (req, res, next) => {
    await Log("backend", "info", "route", "POST /vehicles requested.");
    return createVehicleHandler(req, res, next);
  }
);

router.get("/", async (req, res, next) => {
  await Log("backend", "info", "route", "GET /vehicles requested.");
  return getAllVehicles(req, res, next);
});

router.get("/:id", async (req, res, next) => {
  await Log(
    "backend",
    "info",
    "route",
    `GET /vehicles/${req.params.id} requested.`
  );
  return getVehicle(req, res, next);
});

router.put(
  "/:id",
  validateRequest(validateVehiclePayload, "vehicle update"),
  async (req, res, next) => {
    await Log(
      "backend",
      "info",
      "route",
      `PUT /vehicles/${req.params.id} requested.`
    );
    return updateVehicleHandler(req, res, next);
  }
);

router.delete("/:id", async (req, res, next) => {
  await Log(
    "backend",
    "info",
    "route",
    `DELETE /vehicles/${req.params.id} requested.`
  );
  return deleteVehicleHandler(req, res, next);
});

module.exports = router;
