//labsController
const asyncHandler = require("express-async-handler");
const { passwordConfig: SQLAuthentication, noPasswordConfig: PasswordlessConfig } = require('../config/config.js');
const { createDatabaseConnection } = require('../config/database.js');

// Make sure to await the database connection properly
let database;
createDatabaseConnection(SQLAuthentication).then((db) => {
  database = db;
});

const getAllLabs = asyncHandler(async (req, res) => {
  try {
    // Wait for the database connection to be established before calling the method
    const labs = await database.readAllLabs();
    console.log(`labs: ${JSON.stringify(labs)}`);
    res.status(200).json(labs);
  } catch (err) {
    res.status(502).json({ error: err?.message });
  }
});

module.exports = {
  getAllLabs
};

