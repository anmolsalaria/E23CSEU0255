const vehicles = [];
let nextId = 1;

const listVehicles = () => vehicles;

const getVehicleById = (id) => vehicles.find((vehicle) => vehicle.id === id);

const createVehicle = (data) => {
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
  return vehicle;
};

const updateVehicle = (id, data) => {
  const vehicle = getVehicleById(id);
  if (!vehicle) {
    return null;
  }

  vehicle.vehicleNumber = data.vehicleNumber;
  vehicle.ownerName = data.ownerName;
  vehicle.model = data.model;
  vehicle.serviceDueDate = data.serviceDueDate;
  vehicle.status = data.status;

  return vehicle;
};

const deleteVehicle = (id) => {
  const index = vehicles.findIndex((vehicle) => vehicle.id === id);
  if (index === -1) {
    return false;
  }
  vehicles.splice(index, 1);
  return true;
};

module.exports = {
  listVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
