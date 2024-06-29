const express = require('express');
const router = express.Router();
const amenityController = require('../controllers/amenityController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Amenity:
 *       type: object
 *       required:
 *         - name
 *         - hourlyRate
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         imageUrl:
 *           type: array
 *           items:
 *             type: string
 *         hourlyRate:
 *           type: number
 *         capacity:
 *           type: number
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
 * /api/amenities:
 *   get:
 *     summary: Get all amenities
 *     tags: [Amenities]
 *     responses:
 *       200:
 *         description: Successfully retrieved amenities
 *       500:
 *         description: Server error
 */
router.get('/', amenityController.getAllAmenities);

/**
 * @swagger
 * /api/amenities/{id}:
 *   get:
 *     summary: Get an amenity by ID
 *     tags: [Amenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the amenity
 *       404:
 *         description: Amenity not found
 *       500:
 *         description: Server error
 */
router.get('/:id', amenityController.getAmenityById);

/**
 * @swagger
 * /api/amenities:
 *   post:
 *     summary: Create a new amenity
 *     tags: [Amenities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Amenity'
 *     responses:
 *       201:
 *         description: Successfully created the amenity
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', amenityController.createAmenity);

/**
 * @swagger
 * /api/amenities/{id}:
 *   put:
 *     summary: Update an amenity
 *     tags: [Amenities]
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
 *             $ref: '#/components/schemas/Amenity'
 *     responses:
 *       200:
 *         description: Successfully updated the amenity
 *       404:
 *         description: Amenity not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/:id', amenityController.updateAmenity);

/**
 * @swagger
 * /api/amenities/{id}:
 *   delete:
 *     summary: Delete an amenity
 *     tags: [Amenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the amenity
 *       404:
 *         description: Amenity not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', amenityController.deleteAmenity);

module.exports = router;