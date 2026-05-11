const express = require("express");
const {
  getAllVehicles,
  getVehicle,
  createVehicleHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
} = require("../controllers/vehicleController");

const router = express.Router();

router.post("/", createVehicleHandler);
router.get("/", getAllVehicles);
router.get("/:id", getVehicle);
router.put("/:id", updateVehicleHandler);
router.delete("/:id", deleteVehicleHandler);

module.exports = router;
