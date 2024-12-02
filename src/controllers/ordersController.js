const asyncHandler = require("express-async-handler");
const { passwordConfig: SQLAuthentication, noPasswordConfig: PasswordlessConfig } = require('../config/config.js');
const { createDatabaseConnection } = require('../config/database.js');

// Make sure to await the database connection properly
let database;
createDatabaseConnection(SQLAuthentication).then((db) => {
  database = db;
});
const createOrder = asyncHandler(async (req, res) => {
  try {
    const order = req.body;
    const rowsAffected = await database.createOrder(order);
    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await database.readAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const getOrderByID = asyncHandler(async (req, res) => {
  try {
    const orderID = req.params.id;
    const result = await database.readOrderByID(orderID);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  try {
    const orderID = req.params.id;
    const order = req.body;
    const rowsAffected = await database.updateOrder(orderID, order);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Order updated successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const orderID = req.params.id;
    const rowsAffected = await database.deleteOrder(orderID);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderByID,
  updateOrder,
  deleteOrder
};
