const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");
const employeeController = require("../controllers/employeeController");
const Employee = require("../models/Employee");
const Organization = require("../models/Organization");
const mongoose = require("mongoose");

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management
 */

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *               contactEmail:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               owner:
 *                 type: string
 *               managers:
 *                 type: array
 *                 items:
 *                   type: string
 *               employees:
 *                 type: array
 *                 items:
 *                   type: string
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The organization was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Bad request
 */
router.post("/", organizationController.createOrganization);

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: List of all organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Bad request
 */
router.get("/", organizationController.getOrganizations);

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     summary: Get an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
 *     responses:
 *       200:
 *         description: The organization description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: The organization was not found
 *       400:
 *         description: Bad request
 */
router.get("/:id", organizationController.getOrganizationById);

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     summary: Update an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: The organization was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: The organization was not found
 *       400:
 *         description: Bad request
 */
router.put("/:id", organizationController.updateOrganization);

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     summary: Delete an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
 *     responses:
 *       200:
 *         description: The organization was successfully deleted
 *       404:
 *         description: The organization was not found
 *       400:
 *         description: Bad request
 */
router.delete("/:id", organizationController.deleteOrganization);

/**
 * @swagger
 * /api/organizations/create-organization-with-owner:
 *   post:
 *     summary: Create an organization with an owner (employee)
 *     tags: [Organizations]
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
