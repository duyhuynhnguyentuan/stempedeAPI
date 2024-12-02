const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Registers a new user and stores them in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FullName:
 *                 type: string
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *               Email:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Address:
 *                 type: string
 *               Status:
 *                 type: boolean
 *               IsExternal:
 *                 type: boolean
 *               ExternalProvider:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username already taken
 *       500:
 *         description: Server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login an existing user
 *     description: Logs in the user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout the user
 *     description: Logs out the user (token invalidated on client-side).
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', logoutUser);

module.exports = router;
