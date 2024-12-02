const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, fetchAllUsers, updateUser } = require('../controllers/authController');

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

/**
 * @swagger
 * /api/v1/auth/users:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Fetch all registered users
 *     description: Returns a list of all users in the system (for debugging or verification).
 *     responses:
 *       200:
 *         description: A list of users in the system
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: integer
 *                     description: The ID of the user
 *                   FullName:
 *                     type: string
 *                     description: The full name of the user
 *                   Username:
 *                     type: string
 *                     description: The username of the user
 *                   Email:
 *                     type: string
 *                     description: The email address of the user
 *                   Phone:
 *                     type: string
 *                     description: The phone number of the user
 *                   Address:
 *                     type: string
 *                     description: The address of the user
 *                   Status:
 *                     type: boolean
 *                     description: The status of the user (active/inactive)
 *                   IsExternal:
 *                     type: boolean
 *                     description: Indicates whether the user is an external user (e.g., through OAuth)
 *                   ExternalProvider:
 *                     type: string
 *                     description: The external provider if the user is external
 *       500:
 *         description: Server error while fetching users
 */
router.get('/users', fetchAllUsers);

/**
 * @swagger
 * /api/v1/auth/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a specific user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
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
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error while updating the user
 */
router.put("/:id", updateUser);

module.exports = router;
