const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    // Update only the fields provided in the request body
    Object.keys(req.body).forEach((key) => {
      reservation[key] = req.body[key];
    });

    reservation.updatedAt = new Date();
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get reservations by amenity and date range
exports.getReservationsByAmenityAndDate = async (req, res) => {
    try {
        const { amenityId, startDate, endDate } = req.body;

        console.log(req.body)

        // Validate the input parameters
        if (!amenityId || !startDate || !endDate) {
            return res.status(400).json({ message: 'Amenity ID, start date, and end date are required.' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const reservations = await Reservation.find({
            amenity: amenityId,
            startTime: { $gte: start },
            endTime: { $lte: end }
        });

        console.log(reservations)

        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};