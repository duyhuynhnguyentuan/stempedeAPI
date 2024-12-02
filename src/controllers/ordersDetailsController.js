const asyncHandler = require("express-async-handler");
const { passwordConfig: SQLAuthentication, noPasswordConfig: PasswordlessConfig } = require('../config/config.js');
const { createDatabaseConnection } = require('../config/database.js');

// Make sure to await the database connection properly
let database;
createDatabaseConnection(SQLAuthentication).then((db) => {
  database = db;
});
const createOrderDetail = asyncHandler(async (req, res) => {
  try {
    const orderDetail = req.body;
    const rowsAffected = await database.createOrderDetail(orderDetail);
    res.status(201).json({ message: "Order detail created successfully" });
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getAllOrderDetails = asyncHandler(async (req, res) => {
  try {
    const orderDetails = await database.readAllOrderDetails();
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getOrderDetailByID = asyncHandler(async (req, res) => {
  try {
    const orderDetailID = req.params.id;
    const result = await database.readOrderDetailByID(orderDetailID);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Order detail not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const updateOrderDetail = asyncHandler(async (req, res) => {
  try {
    const orderDetailID = req.params.id;
    const orderDetail = req.body;
    const rowsAffected = await database.updateOrderDetail(orderDetailID, orderDetail);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Order detail updated successfully" });
    } else {
      res.status(404).json({ message: "Order detail not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const deleteOrderDetail = asyncHandler(async (req, res) => {
  try {
    const orderDetailID = req.params.id;
    const rowsAffected = await database.deleteOrderDetail(orderDetailID);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Order detail deleted successfully" });
    } else {
      res.status(404).json({ message: "Order detail not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

module.exports = {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailByID,
  updateOrderDetail,
  deleteOrderDetail
};
