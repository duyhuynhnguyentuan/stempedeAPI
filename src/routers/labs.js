const express = require('express')
const router = express.Router()
const {
    getAllLabs,
    getLabByID
} = require('../controllers/labsController')

/**
 * @swagger
 * /api/v1/labs:
 *   get:
 *     tags:
 *       - Labs
 *     summary: Get all the labs
 *     description: Get information about all fetched labs
 *     responses:
 *       200:
 *         description: Labs fetched successfully 
 */

router.get("/", getAllLabs);


/** 
 * @swagger
 * /api/v1/labs/{id}:
 *   get:
 *     tags:
 *       - Labs
 *     summary: Get a specific lab
 *     description: Get information about a specific lab
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the lab
 *     responses: 
 *       '200':   
 *         description: Lab fetched successfully
 *       '404':
 *         description: Lab not found 
 */
router.get("/:id", getLabByID)
module.exports = router