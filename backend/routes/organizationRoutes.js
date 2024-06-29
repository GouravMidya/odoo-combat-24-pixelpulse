const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

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

module.exports = router;
