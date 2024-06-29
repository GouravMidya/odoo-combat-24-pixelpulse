const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Maintenance:
 *       type: object
 *       required:
 *         - facility
 *         - description
 *         - scheduledDate
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the maintenance record
 *         facility:
 *           type: string
 *           description: The ID of the facility
 *         description:
 *           type: string
 *           description: Description of the maintenance
 *         scheduledDate:
 *           type: string
 *           format: date-time
 *           description: The scheduled date of maintenance
 *         completedDate:
 *           type: string
 *           format: date-time
 *           description: The completion date of maintenance
 *         status:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [scheduled, in-progress, completed, cancelled]
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *         assignedTo:
 *           type: string
 *           description: The ID of the assigned employee
 *         estimatedCost:
 *           type: number
 *         actualCost:
 *           type: number
 *         notes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               activities:
 *                 type: string
 *               repairs:
 *                 type: string
 *               inspections:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     summary: Create a new maintenance record
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceInput'
 *     responses:
 *       201:
 *         description: Maintenance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 */
router.post('/', maintenanceController.createMaintenance);

/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Get all maintenance records
 *     tags: [Maintenance]
 *     responses:
 *       200:
 *         description: List of all maintenance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maintenance'
 */
router.get('/', maintenanceController.getAllMaintenance);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   get:
 *     summary: Get a maintenance record by ID
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Maintenance record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       404:
 *         description: Maintenance record not found
 */
router.get('/:id', maintenanceController.getMaintenanceById);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   patch:
 *     summary: Update a maintenance record
 *     tags: [Maintenance]
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
 *             $ref: '#/components/schemas/MaintenanceUpdate'
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       404:
 *         description: Maintenance record not found
 */
router.patch('/:id', maintenanceController.updateMaintenance);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   delete:
 *     summary: Delete a maintenance record
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully
 *       404:
 *         description: Maintenance record not found
 */
router.delete('/:id', maintenanceController.deleteMaintenance);

module.exports = router;