// routes/facilityRoutes.js

const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facilityController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Facility:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - capacity
 *         - organization
 *         - location
 *         - hourlyRate
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the facility
 *         type:
 *           type: string
 *           description: The type of the facility
 *         business_type:
 *           type: string
 *           enum: [full package, selective package]
 *           description: The business type of the facility
 *         capacity:
 *           type: number
 *           description: The capacity of the facility
 *         description:
 *           type: string
 *           description: A description of the facility
 *         organization:
 *           type: string
 *           description: The ID of the organization this facility belongs to
 *         location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *           description: The geographical location of the facility
 *         managers:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of manager IDs associated with the facility
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of amenity IDs available at the facility
 *         hourlyRate:
 *           type: number
 *           description: The hourly rate for using the facility
 *         availabilitySchedule:
 *           type: object
 *           properties:
 *             monday:
 *               type: object
 *               properties:
 *                 open:
 *                   type: string
 *                 close:
 *                   type: string
 *             tuesday:
 *               type: object
 *               properties:
 *                 open:
 *                   type: string
 *                 close:
 *                   type: string
 *             wednesday:
 *               type: object
 *               properties:
 *                 open:
 *                   type: string
 *                 close:
 *                   type: string
 *             thursday:
 *               type: object
 *               properties:
 *                 open:
 *                   type: string
 *                 close:
 *                   type: string
 *             friday:
 *               type: object
 *               properties:
 *                 open:
 *                   type: string
 *                 close:
 *                   type: string
 *             saturday:
 *               type: object
 *               properties:
 *                 open:
 *                   type: string
 *                 close:
 *                   type: string
 *             sunday:
 *               type: object
 *               properties:
 *                 open:
 *                   type: string
 *                 close:
 *                   type: string
 *           description: The availability schedule of the facility
 *         imageUrl:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the facility
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the facility is currently active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the facility was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the facility was last updated
 */

/**
 * @swagger
 * /api/facility:
 *   get:
 *     summary: Get all facilities
 *     tags: [Facilities]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get("/", facilityController.getAllFacilities);

/**
 * @swagger
 * /api/facility/{id}:
 *   get:
 *     summary: Get a facility by ID
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Facility not found
 *       500:
 *         description: Server error
 */
router.get("/:id", facilityController.getFacilityById);

/**
 * @swagger
 * /api/facility:
 *   post:
 *     summary: Create a new facility
 *     tags: [Facilities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Facility'
 *     responses:
 *       201:
 *         description: Facility created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", facilityController.createFacility);

/**
 * @swagger
 * /api/facility/{id}:
 *   put:
 *     summary: Update a facility
 *     tags: [Facilities]
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
 *             $ref: '#/components/schemas/Facility'
 *     responses:
 *       200:
 *         description: Facility updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Facility not found
 *       500:
 *         description: Server error
 */
router.put("/:id", facilityController.updateFacility);

/**
 * @swagger
 * /api/facility/{id}:
 *   delete:
 *     summary: Delete a facility
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facility deleted successfully
 *       404:
 *         description: Facility not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", facilityController.deleteFacility);


/**
 * @swagger
 * /api/facility/nearby:
 *   post:
 *     summary: Retrieve facilities within a specified distance from given coordinates.
 *     tags: [Facilities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longitude:
 *                 type: number
 *               latitude:
 *                 type: number
 *               distance:
 *                 type: number
 *     responses:
 *       '200':
 *         description: A JSON array of facilities within the specified distance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 facilities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Facility'
 *       '500':
 *         description: Internal server error.
 */
// Route to fetch facilities within a specified distance
router.post('/nearby', facilityController.getFacilitiesWithinDistance);

module.exports = router;
