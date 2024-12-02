const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct
} = require("../controllers/productsController");

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Endpoints for managing products
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductName:
 *                 type: string
 *               Description:
 *                 type: string
 *               Price:
 *                 type: number
 *                 format: float
 *               StockQuantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error while creating the product
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       500:
 *         description: Server error while fetching products
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a specific product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error while fetching the product
 */
router.get("/:id", getProductByID);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a specific product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductName:
 *                 type: string
 *               Description:
 *                 type: string
 *               Price:
 *                 type: number
 *                 format: float
 *               StockQuantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error while updating the product
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error while deleting the product
 */
router.delete("/:id", deleteProduct);

module.exports = router;
