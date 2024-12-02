const express = require("express");
const router = express.Router();
const {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryByID,
  updateSubcategory,
  deleteSubcategory
} = require("../controllers/subcategoriesController");

/**
 * @swagger
 * tags:
 *   - name: Subcategories
 *     description: Endpoints for managing subcategories
 */

/**
 * @swagger
 * /api/v1/subcategories:
 *   post:
 *     tags:
 *       - Subcategories
 *     summary: Create a new subcategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SubcategoryName:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       500:
 *         description: Server error while creating the subcategory
 */
router.post("/", createSubcategory);

/**
 * @swagger
 * /api/v1/subcategories:
 *   get:
 *     tags:
 *       - Subcategories
 *     summary: Get all subcategories
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully
 *       500:
 *         description: Server error while fetching subcategories
 */
router.get("/", getAllSubcategories);

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   get:
 *     tags:
 *       - Subcategories
 *     summary: Get a specific subcategory by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subcategory fetched successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Server error while fetching the subcategory
 */
router.get("/:id", getSubcategoryByID);

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   put:
 *     tags:
 *       - Subcategories
 *     summary: Update a specific subcategory by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SubcategoryName:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Server error while updating the subcategory
 */
router.put("/:id", updateSubcategory);

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   delete:
 *     tags:
 *       - Subcategories
 *     summary: Delete a subcategory by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Server error while deleting the subcategory
 */
router.delete("/:id", deleteSubcategory);

module.exports = router;
