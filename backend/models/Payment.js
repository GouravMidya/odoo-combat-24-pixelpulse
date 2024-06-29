const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['credit_card', 'debit_card', 'bank_transfer', 'cash'], required: true },
    transactionId: { type: String, unique: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    paymentDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
  
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;