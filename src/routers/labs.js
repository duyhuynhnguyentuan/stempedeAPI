//routers/getAllLabs.js
const express = require('express')
const router = express.Router()
const {
    getAllLabs,
  getLabByID,
  createLab,
  updateALab,
  deleteALab,
} = require('../controllers/labsController')

/**
 * @swagger
 * tags:
 *   - name: Labs
 *     description: Endpoints for managing labs
 */

/**
 * @swagger
 * /api/v1/labs:
 *   get:
 *     tags:
 *       - Labs
 *     summary: Get all labs
 *     description: Fetches a list of all the labs in the system.
 *     responses:
 *       200:
 *         description: Labs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   LabID:
 *                     type: integer
 *                     description: The ID of the lab
 *                   LabName:
 *                     type: string
 *                     description: The name of the lab
 *                   Description:
 *                     type: string
 *                     description: A brief description of the lab
 *                   LabFileURL:
 *                     type: string
 *                     description: The URL for lab resources or file
 *       500:
 *         description: Server error while fetching labs
 */
router.get("/", getAllLabs);

/**
 * @swagger
 * /api/v1/labs/{id}:
 *   get:
 *     tags:
 *       - Labs
 *     summary: Get a specific lab by ID
 *     description: Fetches the details of a specific lab using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lab to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lab fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 LabID:
 *                   type: integer
 *                 LabName:
 *                   type: string
 *                 Description:
 *                   type: string
 *                 LabFileURL:
 *                   type: string
 *       404:
 *         description: Lab not found
 *       500:
 *         description: Server error while fetching the lab
 */
router.get("/:id", getLabByID);

/**
 * @swagger
 * /api/v1/labs:
 *   post:
 *     tags:
 *       - Labs
 *     summary: Create a new lab
 *     description: Adds a new lab to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LabID:
 *                 type: integer
 *                 description: The ID of the lab
 *               LabName:
 *                 type: string
 *                 description: The name of the lab
 *               Description:
 *                 type: string
 *                 description: A brief description of the lab
 *               LabFileURL:
 *                 type: string
 *                 description: The URL for lab resources or file
 *     responses:
 *       201:
 *         description: Lab created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *       500:
 *         description: Server error while creating the lab
 */
router.post("/", createLab);

/**
 * @swagger
 * /api/v1/labs/{id}:
 *   put:
 *     tags:
 *       - Labs
 *     summary: Update a specific lab by ID
 *     description: Updates the details of a specific lab using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lab to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LabName:
 *                 type: string
 *               Description:
 *                 type: string
 *               LabFileURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lab updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message
 *       404:
 *         description: Lab not found
 *       500:
 *         description: Server error while updating the lab
 */
router.put("/:id", updateALab);

/**
 * @swagger
 * /api/v1/labs/{id}:
 *   delete:
 *     tags:
 *       - Labs
 *     summary: Delete a lab by ID
 *     description: Deletes a specific lab by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lab to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Lab deleted successfully
 *       404:
 *         description: Lab not found
 *       500:
 *         description: Server error while deleting the lab
 */
router.delete("/:id", deleteALab);


module.exports = router