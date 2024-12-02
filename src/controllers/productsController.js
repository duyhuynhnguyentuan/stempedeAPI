const asyncHandler = require("express-async-handler");
const { passwordConfig: SQLAuthentication, noPasswordConfig: PasswordlessConfig } = require('../config/config.js');
const { createDatabaseConnection } = require('../config/database.js');

// Make sure to await the database connection properly
let database;
createDatabaseConnection(SQLAuthentication).then((db) => {
  database = db;
});
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = req.body;
    const rowsAffected = await database.createProduct(product);
    res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await database.readAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getProductByID = asyncHandler(async (req, res) => {
  try {
    const productID = req.params.id;
    const result = await database.readProductByID(productID);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productID = req.params.id;
    const product = req.body;
    const rowsAffected = await database.updateProduct(productID, product);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productID = req.params.id;
    const rowsAffected = await database.deleteProduct(productID);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct
};
