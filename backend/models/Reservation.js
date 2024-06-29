const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
    amenity: { type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: [{ 
        status: {type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending'},
        updatedAt: { type: Date, default: Date.now }
    }],
    totalCost: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
  
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;