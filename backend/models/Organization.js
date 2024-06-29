const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  managers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  facilities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Facility" }],
  imageUrl: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
