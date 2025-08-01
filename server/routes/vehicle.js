const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicleController');

// CRUD Routes
router.post('/', createVehicle);          // Add vehicle
router.get('/', getAllVehicles);          // Get all vehicles
router.get('/:id', getVehicleById);       // Get single vehicle
router.put('/:id', updateVehicle);        // Update vehicle
router.delete('/:id', deleteVehicle);     // Delete vehicle

module.exports = router;

