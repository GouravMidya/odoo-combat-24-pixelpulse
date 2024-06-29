const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  targetType: {
    type: String,
    enum: ['Organization', 'Employee', 'Facility', 'User'],
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'targetType',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  images: [{
    type: String // URLs to images, if you decide to allow image uploads with reviews
  }],
  helpful: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  reported: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for efficient querying
reviewSchema.index({ targetType: 1, targetId: 1 });

// Virtual for average rating (can be used when aggregating reviews)
reviewSchema.virtual('averageRating').get(function() {
  return this.rating;
});

// Pre-save hook to update the updatedAt field
reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;