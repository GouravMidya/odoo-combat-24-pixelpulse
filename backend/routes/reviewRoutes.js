// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - author
 *         - targetType
 *         - targetId
 *         - rating
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the review
 *         author:
 *           type: string
 *           description: The ID of the author
 *         targetType:
 *           type: string
 *           enum: [Organization, Employee, Facility, User]
 *           description: The type of entity being reviewed
 *         targetId:
 *           type: string
 *           description: The ID of the entity being reviewed
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: The rating given in the review
 *         title:
 *           type: string
 *           maxLength: 100
 *           description: The title of the review
 *         content:
 *           type: string
 *           maxLength: 1000
 *           description: The content of the review
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of images associated with the review
 *         helpful:
 *           type: object
 *           properties:
 *             count:
 *               type: number
 *               description: The number of users who found this review helpful
 *             users:
 *               type: array
 *               items:
 *                 type: string
 *               description: IDs of users who found this review helpful
 *         reported:
 *           type: object
 *           properties:
 *             count:
 *               type: number
 *               description: The number of users who reported this review
 *             users:
 *               type: array
 *               items:
 *                 type: string
 *               description: IDs of users who reported this review
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: The status of the review
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was last updated
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post('/', reviewController.createReview);

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: targetType
 *         schema:
 *           type: string
 *         description: Filter by target type
 *       - in: query
 *         name: targetId
 *         schema:
 *           type: string
 *         description: Filter by target ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', reviewController.getAllReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get('/:id', reviewController.getReviewById);

/**
 * @swagger
 * /api/reviews/{id}:
 *   patch:
 *     summary: Update a review
 *     tags: [Reviews]
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
 *             $ref: '#/components/schemas/ReviewUpdate'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.patch('/:id', reviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Review not found
 */
router.delete('/:id', reviewController.deleteReview);

module.exports = router;