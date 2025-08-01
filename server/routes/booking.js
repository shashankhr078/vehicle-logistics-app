const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus
} = require('../controllers/bookingController');

// Book vehicle
router.post('/', createBooking);

// Admin: get all bookings
router.get('/', getAllBookings);

// User: get my bookings
router.get('/user/:userId', getUserBookings);

// Admin: update booking status
router.put('/:id/status', updateBookingStatus);

module.exports = router;

