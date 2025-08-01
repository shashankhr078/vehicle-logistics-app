const Vehicle = require('../models/Vehicle');

// Create vehicle
exports.createVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding vehicle', err });
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching vehicles', err });
  }
};

// Get a single vehicle
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching vehicle', err });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating vehicle', err });
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting vehicle', err });
  }
};

