const Organization = require("../models/Organization");

// @desc    Create a new organization
// @route   POST /api/organizations
// @access  Private
exports.createOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json({ success: true, data: organization });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all organizations
// @route   GET /api/organizations
// @access  Public
exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().populate(
      "owner managers employees facilities"
    );
    res.status(200).json({ success: true, data: organizations });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get a single organization by ID
// @route   GET /api/organizations/:id
// @access  Public
exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id).populate(
      "owner managers employees facilities"
    );
    if (!organization) {
      return res
        .status(404)
        .json({ success: false, error: "Organization not found" });
    }
    res.status(200).json({ success: true, data: organization });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update an organization by ID
// @route   PUT /api/organizations/:id
// @access  Private
exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!organization) {
      return res
        .status(404)
        .json({ success: false, error: "Organization not found" });
    }
    res.status(200).json({ success: true, data: organization });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete an organization by ID
// @route   DELETE /api/organizations/:id
// @access  Private
exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
      return res
        .status(404)
        .json({ success: false, error: "Organization not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
