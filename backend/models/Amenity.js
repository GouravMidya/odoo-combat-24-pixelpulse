const amenitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String }, // URL or path to the icon image
    imageUrl: [{type: String}],
    hourlyRate: { type: Number, required: true },
    capacity: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
  
const Amenity = mongoose.model('Amenity', amenitySchema);