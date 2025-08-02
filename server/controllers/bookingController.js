const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { userId, vehicleId, pickupDate, returnDate } = req.body;
  try {
    const booking = new Booking({
      user: userId,
      vehicle: vehicleId,
      pickupDate,
      returnDate
    });
    await booking.save();
    res.status(201).json({ msg: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating booking', err });
  }
};

// Get all bookings (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user vehicle');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching bookings', err });
  }
};

// Get bookings by user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('vehicle');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching user bookings', err });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating booking status', err });
  }
};
exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('vehicle');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
};

