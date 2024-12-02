const express = require("express");
const router = express.Router();
const {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailByID,
  updateOrderDetail,
  deleteOrderDetail
} = require("../controllers/ordersDetailsController");

/**
 * @swagger
 * tags:
 *   - name: OrderDetails
 *     description: Endpoints for managing order details
 */

/**
 * @swagger
 * /api/v1/orderdetails:
 *   post:
 *     tags:
 *       - OrderDetails
 *     summary: Create a new order detail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrderID:
 *                 type: integer
 *               ProductID:
 *                 type: integer
 *               ProductDescription:
 *                 type: string
 *               Quantity:
 *                 type: integer
 *               Price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Order detail created successfully
 *       500:
 *         description: Server error while creating the order detail
 */
router.post("/", createOrderDetail);

/**
 * @swagger
 * /api/v1/orderdetails:
 *   get:
 *     tags:
 *       - OrderDetails
 *     summary: Get all order details
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 *       500:
 *         description: Server error while fetching order details
 */
router.get("/", getAllOrderDetails);

/**
 * @swagger
 * /api/v1/orderdetails/{id}:
 *   get:
 *     tags:
 *       - OrderDetails
 *     summary: Get a specific order detail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order detail to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order detail fetched successfully
 *       404:
 *         description: Order detail not found
 *       500:
 *         description: Server error while fetching the order detail
 */
router.get("/:id", getOrderDetailByID);

/**
 * @swagger
 * /api/v1/orderdetails/{id}:
 *   put:
 *     tags:
 *       - OrderDetails
 *     summary: Update a specific order detail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order detail to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductID:
 *                 type: integer
 *               ProductDescription:
 *                 type: string
 *               Quantity:
 *                 type: integer
 *               Price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Order detail updated successfully
 *       404:
 *         description: Order detail not found
 *       500:
 *         description: Server error while updating the order detail
 */
router.put("/:id", updateOrderDetail);

/**
 * @swagger
 * /api/v1/orderdetails/{id}:
 *   delete:
 *     tags:
 *       - OrderDetails
 *     summary: Delete an order detail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order detail to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order detail deleted successfully
 *       404:
 *         description: Order detail not found
 *       500:
 *         description: Server error while deleting the order detail
 */
router.delete("/:id", deleteOrderDetail);

module.exports = router;
