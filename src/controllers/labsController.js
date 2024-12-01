//labsController
const asyncHandler = require("express-async-handler");
const { passwordConfig: SQLAuthentication, noPasswordConfig: PasswordlessConfig } = require('../config/config.js');
const { createDatabaseConnection } = require('../config/database.js');

// Make sure to await the database connection properly
let database;
createDatabaseConnection(SQLAuthentication).then((db) => {
  database = db;
});
//get all labs
const getAllLabs = asyncHandler(async (req, res) => {
  try {
    // Wait for the database connection to be established before calling the method
    const labs = await database.readAllLabs();
    // console.log(`labs: ${JSON.stringify(labs)}`);
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({ 
        error: err?.message
     });
  }
});
//get lab by id
const getLabByID = asyncHandler(async (req, res)=> {
    try{
        const labID = req.params.id;
        if(labID){
            const result = await database.readALab(labID)
            res.status(200).json(result);
        }else{
            res.status(400);
        }
    }catch(err) {
        res.status(500).json({ error: err?.message });
    }
})

module.exports = {
  getAllLabs,
  getLabByID
};

