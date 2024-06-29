const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - user
 *         - facility
 *         - startTime
 *         - endTime
 *         - totalCost
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the reservation
 *         user:
 *           type: string
 *           description: The ID of the user making the reservation
 *         facility:
 *           type: string
 *           description: The ID of the facility being reserved
 *         Amenity:
 *           type: string
 *           description: The ID of the amenity being reserved
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the reservation
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the reservation
 *         status:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *         totalCost:
 *           type: number
 *           description: The total cost of the reservation
 *         paymentStatus:
 *           type: string
 *           enum: [pending, paid, refunded]
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationInput'
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 */
router.post('/', reservationController.createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get('/', reservationController.getAllReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */
router.get('/:id', reservationController.getReservationById);

/**
 * @swagger
 * /api/reservations/{id}:
 *   patch:
 *     summary: Update a reservation
 *     tags: [Reservations]
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
 *             $ref: '#/components/schemas/ReservationUpdate'
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */
router.patch('/:id', reservationController.updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 */
router.delete('/:id', reservationController.deleteReservation);

/**
 * @swagger
 * /api/reservations/amenity:
 *   post:
 *     summary: Get reservations by amenity and date range
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amenityId:
 *                 type: string
 *                 description: The ID of the amenity
 *                 example: 60d21b4667d0d8992e610c85
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date
 *                 example: "2023-06-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The end date
 *                 example: "2023-06-30T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Invalid input parameters
 *       500:
 *         description: Server error
 */
router.post('/amenity', reservationController.getReservationsByAmenityAndDate);

module.exports = router;