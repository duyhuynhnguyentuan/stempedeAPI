const express = require('express')
const router = express.Router()
const {
    getAllLabs
} = require('../controllers/labsController')

/**
 * @swagger
 * /api/v1/labs:
 *   get:
 *     tags:
 *       - Labs routes
 *     summary: Get all the labs
 *     description: Get information about all fetched labs
 *     responses:
 *       200:
 *         description: Labs fetched successfully 
 */

router.get("/", getAllLabs);

module.exports = router