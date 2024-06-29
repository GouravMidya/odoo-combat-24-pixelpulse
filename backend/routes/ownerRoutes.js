const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Owner:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         organization:
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
 * /api/owners:
 *   get:
 *     summary: Retrieve all owners
 *     responses:
 *       200:
 *         description: A list of owners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 */

router.get("/api/owners", ownerController.getAllOwners);

/**
 * @swagger
 * /api/owners/{id}:
 *   get:
 *     summary: Retrieve a single owner by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner ID
 *     responses:
 *       200:
 *         description: A single owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: Owner not found
 */

router.get("/api/owners/:id", ownerController.getOwnerById);

/**
 * @swagger
 * /api/owners:
 *   post:
 *     summary: Create a new owner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Bad request
 */

router.post("/api/owners", ownerController.createOwner);

/**
 * @swagger
 * /api/owners/{id}:
 *   put:
 *     summary: Update an existing owner by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Owner not found
 */

router.put("/api/owners/:id", ownerController.updateOwner);

/**
 * @swagger
 * /api/owners/{id}:
 *   delete:
 *     summary: Delete an owner by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner ID
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       404:
 *         description: Owner not found
 */

router.delete("/api/owners/:id", ownerController.deleteOwner);

module.exports = router;
