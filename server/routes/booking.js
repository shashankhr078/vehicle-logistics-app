const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus
} = require('../controllers/bookingController');

// 🔐 Import the auth middleware
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Book vehicle (protected - logged-in users only)
router.post('/', verifyToken, createBooking);

// Admin: get all bookings (protected - admin only)
router.get('/', verifyToken, isAdmin, getAllBookings);

// User: get my bookings (protected - logged-in users only)
router.get('/user/:userId', verifyToken, getUserBookings);

// Admin: update booking status (protected - admin only)
router.put('/:id/status', verifyToken, isAdmin, updateBookingStatus);

module.exports = router;
