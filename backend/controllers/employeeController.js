const Employee = require("../models/Employee");
const Organization = require("../models/Organization");

/**
 * Get all employees
 */
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("organization");
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

/**
 * Get an employee by ID
 */
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "organization"
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    // Extract the owner ID from the request body
    const { ownerId, ...employeeData } = req.body;

    // Fetch the organization using the owner ID
    const organization = await Organization.findOne({ owner: ownerId });

    // If organization not found, return an error
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Set the organization ID in the employee data
    employeeData.organization = organization._id;

    // Create a new employee with the organization ID
    const newEmployee = new Employee(employeeData);
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: "Error creating employee", error: error.message });
  }
};

/**
 * Update an employee
 */
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};

/**
 * Delete an employee
 */
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
};
