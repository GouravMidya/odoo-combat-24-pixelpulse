const Amenity = require('../models/Amenity');

/**
 * Get all amenities
 * @route GET /api/amenities
 */
exports.getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching amenities', error: error.message });
  }
};

/**
 * Get an amenity by ID
 * @route GET /api/amenities/:id
 */
exports.getAmenityById = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.status(200).json(amenity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching amenity', error: error.message });
  }
};

/**
 * Create a new amenity
 * @route POST /api/amenities
 */
exports.createAmenity = async (req, res) => {
  try {
    const newAmenity = new Amenity(req.body);
    const savedAmenity = await newAmenity.save();
    res.status(201).json(savedAmenity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating amenity', error: error.message });
  }
};

/**
 * Update an amenity
 * @route PUT /api/amenities/:id
 */
exports.updateAmenity = async (req, res) => {
  try {
    const updatedAmenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAmenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.status(200).json(updatedAmenity);
  } catch (error) {
    res.status(400).json({ message: 'Error updating amenity', error: error.message });
  }
};

/**
 * Delete an amenity
 * @route DELETE /api/amenities/:id
 */
exports.deleteAmenity = async (req, res) => {
  try {
    const deletedAmenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!deletedAmenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.status(200).json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting amenity', error: error.message });
  }
};