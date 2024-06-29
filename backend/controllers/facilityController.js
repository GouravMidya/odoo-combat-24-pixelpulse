// controllers/facilityController.js

const Facility = require('../models/Facility');

exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facilities', error: error.message });
  }
};

exports.getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facility', error: error.message });
  }
};

exports.createFacility = async (req, res) => {
  try {
    const newFacility = new Facility(req.body);
    const savedFacility = await newFacility.save();
    res.status(201).json(savedFacility);
  } catch (error) {
    res.status(400).json({ message: 'Error creating facility', error: error.message });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const updatedFacility = await Facility.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedFacility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.status(200).json(updatedFacility);
  } catch (error) {
    res.status(400).json({ message: 'Error updating facility', error: error.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    const deletedFacility = await Facility.findByIdAndDelete(req.params.id);
    if (!deletedFacility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.status(200).json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting facility', error: error.message });
  }
};

// Controller function to fetch facilities within a specified distance from given coordinates
exports.getFacilitiesWithinDistance = async (req, res) =>{
  const { longitude, latitude, distance } = req.body;

  // Convert distance to meters (since MongoDB uses meters for geo queries)
  const distanceInMeters = distance * 1000;

  try {
      const facilities = await Facility.find({
          location: {
              $nearSphere: {
                  $geometry: {
                      type: "Point",
                      coordinates: [longitude, latitude]
                  },
                  $maxDistance: distanceInMeters
              }
          }
      }).exec();

      res.json({ facilities });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}