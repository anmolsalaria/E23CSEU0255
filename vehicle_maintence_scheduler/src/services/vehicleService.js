const { Log } = require("../../../logging_middleware/src");

const vehicles = [];
let nextId = 1;

const listVehicles = async () => {
  await Log("backend", "info", "service", "Listing vehicles.");
  return vehicles;
};

const getVehicleById = async (id) => {
  await Log("backend", "info", "service", `Fetching vehicle ${id}.`);
  return vehicles.find((vehicle) => vehicle.id === id);
};

const createVehicle = async (data) => {
  await Log("backend", "info", "service", "Creating vehicle.");
  const vehicle = {
    id: nextId,
    vehicleNumber: data.vehicleNumber,
    ownerName: data.ownerName,
    model: data.model,
    serviceDueDate: data.serviceDueDate,
    status: data.status,
  };

  nextId += 1;
  vehicles.push(vehicle);
  await Log("backend", "info", "service", `Vehicle ${vehicle.id} created.`);
  return vehicle;
};

const updateVehicle = async (id, data) => {
  await Log("backend", "info", "service", `Updating vehicle ${id}.`);
  const vehicle = vehicles.find((item) => item.id === id);
  if (!vehicle) {
    return null;
  }

  vehicle.vehicleNumber = data.vehicleNumber;
  vehicle.ownerName = data.ownerName;
  vehicle.model = data.model;
  vehicle.serviceDueDate = data.serviceDueDate;
  vehicle.status = data.status;

  await Log("backend", "info", "service", `Vehicle ${id} updated.`);
  return vehicle;
};

const deleteVehicle = async (id) => {
  await Log("backend", "info", "service", `Deleting vehicle ${id}.`);
  const index = vehicles.findIndex((vehicle) => vehicle.id === id);
  if (index === -1) {
    return false;
  }
  vehicles.splice(index, 1);
  await Log("backend", "info", "service", `Vehicle ${id} deleted.`);
  return true;
};

module.exports = {
  listVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
