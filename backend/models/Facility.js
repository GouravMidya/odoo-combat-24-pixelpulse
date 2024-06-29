const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    business_type: { type: String, enum: ["full package","selective package"] },
    capacity: { type: Number, required: true },
    description: { type: String },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],
    hourlyRate: { type: Number, required: true },
    availabilitySchedule: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String }
    },
    imageUrl: [{ type: String }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create 2dsphere index on location field
facilitySchema.index({ location: '2dsphere' });

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
