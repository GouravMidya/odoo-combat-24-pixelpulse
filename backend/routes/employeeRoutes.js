const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const Employee = require("../models/Employee");
const Organization = require("../models/Organization");
const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *         - role
 *         - organization
 *         - hireDate
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         phoneNumber:
 *           type: string
 *         role:
 *           type: string
 *           enum: [manager, staff]
 *         organization:
 *           type: string
 *           format: uuid
 *         hireDate:
 *           type: string
 *           format: date
 *         isActive:
 *           type: boolean
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Successfully retrieved employees
 *       500:
 *         description: Server error
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved employee
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", employeeController.createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", employeeController.deleteEmployee);

/**
 * @swagger
 * /api/create-organization-with-owner:
 *   post:
 *     summary: Create an organization with an owner (employee)
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the organization
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Street address
 *                   city:
 *                     type: string
 *                     description: City
 *                   state:
 *                     type: string
 *                     description: State
 *                   country:
 *                     type: string
 *                     description: Country
 *                   postalCode:
 *                     type: string
 *                     description: Postal code
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 description: Contact email of the organization
 *               contactPhone:
 *                 type: string
 *                 description: Contact phone number of the organization
 *               ownerFirstName:
 *                 type: string
 *                 description: First name of the owner (employee)
 *               ownerLastName:
 *                 type: string
 *                 description: Last name of the owner (employee)
 *               ownerEmail:
 *                 type: string
 *                 format: email
 *                 description: Email of the owner (employee)
 *               ownerPassword:
 *                 type: string
 *                 format: password
 *                 description: Password of the owner (employee)
 *               ownerPhoneNumber:
 *                 type: string
 *                 description: Phone number of the owner (employee)
 *     responses:
 *       201:
 *         description: Organization and owner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 organization:
 *                   $ref: '#/components/schemas/Organization'
 *                 owner:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/create-organization-with-owner", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Create the organization without the owner
    const organizationData = {
      name: req.body.name,
      address: req.body.address,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      // other fields...
    };

    const organization = new Organization(organizationData);
    await organization.save({ session });

    // Step 2: Create the owner (employee)
    const ownerData = {
      firstName: req.body.ownerFirstName,
      lastName: req.body.ownerLastName,
      email: req.body.ownerEmail,
      password: req.body.ownerPassword, // Remember to hash this!
      phoneNumber: req.body.ownerPhoneNumber,
      role: "owner", // or whatever role you assign to owners
      organization: organization._id,
      hireDate: new Date(),
      // other fields...
    };

    const owner = new Employee(ownerData);
    await owner.save({ session });

    // Step 3: Update the organization with the owner
    organization.owner = owner._id;
    await organization.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Organization and owner created successfully",
      organization,
      owner,
    });
  } catch (error) {
    // If an error occurred, abort the transaction
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating organization and owner", error });
  }
});

module.exports = router;
