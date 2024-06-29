const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
    description: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    completedDate: { type: Date },
    status: [{ 
        status: {type: String, enum: ['scheduled', 'in-progress', 'completed', 'cancelled'], default: 'scheduled'},
        updatedAt: { type: Date, default: Date.now },
     }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    estimatedCost: { type: Number },
    actualCost: { type: Number },
    notes: [{
        activities: {type: String},
        repairs: {type: String},
        inspections: {type: String},
        updatedAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
  
const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
  