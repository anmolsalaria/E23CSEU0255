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

const router = express.Router();

router.post("/", validateRequest(validateVehiclePayload, "vehicle create"), createVehicleHandler);
router.get("/", getAllVehicles);
router.get("/:id", getVehicle);
router.put("/:id", validateRequest(validateVehiclePayload, "vehicle update"), updateVehicleHandler);
router.delete("/:id", deleteVehicleHandler);

module.exports = router;
