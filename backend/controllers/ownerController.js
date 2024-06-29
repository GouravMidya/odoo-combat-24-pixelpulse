const Owner = require("../models/Owner");

// Controller methods
exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (owner) {
      res.status(200).json(owner);
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOwner = async (req, res) => {
  const newOwner = new Owner(req.body);
  try {
    const savedOwner = await newOwner.save();
    res.status(201).json(savedOwner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedOwner) {
      res.status(200).json(updatedOwner);
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOwner = async (req, res) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (deletedOwner) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
