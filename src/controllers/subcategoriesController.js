const asyncHandler = require("express-async-handler");
const { passwordConfig: SQLAuthentication, noPasswordConfig: PasswordlessConfig } = require('../config/config.js');
const { createDatabaseConnection } = require('../config/database.js');

// Make sure to await the database connection properly
let database;
createDatabaseConnection(SQLAuthentication).then((db) => {
  database = db;
});
const createSubcategory = asyncHandler(async (req, res) => {
  try {
    const subcategory = req.body;
    const rowsAffected = await database.createSubcategory(subcategory);
    res.status(201).json({ message: "Subcategory created successfully" });
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getAllSubcategories = asyncHandler(async (req, res) => {
  try {
    const subcategories = await database.readAllSubcategories();
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getSubcategoryByID = asyncHandler(async (req, res) => {
  try {
    const subcategoryID = req.params.id;
    const result = await database.readSubcategoryByID(subcategoryID);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Subcategory not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const updateSubcategory = asyncHandler(async (req, res) => {
  try {
    const subcategoryID = req.params.id;
    const subcategory = req.body;
    const rowsAffected = await database.updateSubcategory(subcategoryID, subcategory);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Subcategory updated successfully" });
    } else {
      res.status(404).json({ message: "Subcategory not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const deleteSubcategory = asyncHandler(async (req, res) => {
  try {
    const subcategoryID = req.params.id;
    const rowsAffected = await database.deleteSubcategory(subcategoryID);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Subcategory deleted successfully" });
    } else {
      res.status(404).json({ message: "Subcategory not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

module.exports = {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryByID,
  updateSubcategory,
  deleteSubcategory
};
