// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - firstName
 *         - lastName
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the admin
 *         username:
 *           type: string
 *           description: The admin's username
 *         email:
 *           type: string
 *           format: email
 *           description: The admin's email
 *         firstName:
 *           type: string
 *           description: The admin's first name
 *         lastName:
 *           type: string
 *           description: The admin's last name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the admin was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the admin was last updated
 */

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminInput'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Bad request
 */
router.post('/', adminController.createAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Get an admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found
 */
router.get('/:id', adminController.getAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update an admin
 *     tags: [Admin]
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
 *             $ref: '#/components/schemas/AdminUpdate'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found
 */
router.put('/:id', adminController.updateAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 */
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;