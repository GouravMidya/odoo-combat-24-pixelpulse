const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - reservation
 *         - user
 *         - amount
 *         - paymentMethod
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the payment
 *         reservation:
 *           type: string
 *           description: The ID of the associated reservation
 *         user:
 *           type: string
 *           description: The ID of the user making the payment
 *         amount:
 *           type: number
 *           description: The payment amount
 *         paymentMethod:
 *           type: string
 *           enum: [credit_card, debit_card, bank_transfer, cash]
 *           description: The method of payment
 *         transactionId:
 *           type: string
 *           description: The unique transaction ID
 *         status:
 *           type: string
 *           enum: [pending, completed, failed, refunded]
 *           default: pending
 *           description: The status of the payment
 *         paymentDate:
 *           type: string
 *           format: date-time
 *           description: The date and time of the payment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the payment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the payment was last updated
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
router.post('/', paymentController.createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
router.get('/', paymentController.getAllPayments);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 */
router.get('/:id', paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments/{id}:
 *   patch:
 *     summary: Update a payment
 *     tags: [Payments]
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
 *             $ref: '#/components/schemas/PaymentUpdate'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 */
router.patch('/:id', paymentController.updatePayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete('/:id', paymentController.deletePayment);

module.exports = router;