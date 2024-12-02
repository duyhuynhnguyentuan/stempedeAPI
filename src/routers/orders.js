const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderByID,
  updateOrder,
  deleteOrder
} = require("../controllers/ordersController");

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Endpoints for managing orders
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: integer
 *               OrderDate:
 *                 type: string
 *                 format: date
 *               TotalAmount:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Server error while creating the order
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       500:
 *         description: Server error while fetching the orders
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get a specific order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error while fetching the order
 */
router.get("/:id", getOrderByID);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update a specific order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: integer
 *               OrderDate:
 *                 type: string
 *                 format: date
 *               TotalAmount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error while updating the order
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error while deleting the order
 */
router.delete("/:id", deleteOrder);

module.exports = router;
