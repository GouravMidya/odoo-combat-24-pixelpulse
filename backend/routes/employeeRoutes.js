const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const Employee = require("../models/Employee");
const Organization = require("../models/Organization");
const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *         - role
 *         - organization
 *         - hireDate
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         phoneNumber:
 *           type: string
 *         role:
 *           type: string
 *           enum: [manager, staff]
 *         organization:
 *           type: string
 *           format: uuid
 *         hireDate:
 *           type: string
 *           format: date
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
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Successfully retrieved employees
 *       500:
 *         description: Server error
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved employee
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                 type: string
 *                 description: ID of the owner to fetch the organization
 *                 example: 60c72b2f9b1d8b5b4c8a23a3
 *               firstName:
 *                 type: string
 *                 description: First name of the employee
 *               lastName:
 *                 type: string
 *                 description: Last name of the employee
 *               email:
 *                 type: string
 *                 description: Email of the employee
 *               password:
 *                 type: string
 *                 description: Password for the employee
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the employee
 *               role:
 *                 type: string
 *                 description: Role of the employee
 *                 enum: [manager, staff, owner]
 *               hireDate:
 *                 type: string
 *                 format: date
 *                 description: Hire date of the employee
 *             required:
 *               - ownerId
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - phoneNumber
 *               - role
 *               - hireDate
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Server error
 */
router.post("/", employeeController.createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
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
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
