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

const createLab = asyncHandler(async (req, res) => {
    try {
      const lab = req.body;
      const rowsAffected = await database.createLab(lab);
      res.status(201).json({ message: "Lab created successfully" });
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });
  

  const updateALab = asyncHandler(async (req, res) => {
    try {
      const labID = req.params.id;
      const lab = req.body;
      if (labID && lab) {
        delete lab.labID;
        const rowsAffected = await database.updateALab(labID, lab);
        if (rowsAffected > 0) {
          res.status(200).json({ message: "Lab updated successfully" });
        } else {
          res.status(404).json({ error: "Lab not found" });
        }
      } else {
        res.status(400).json({ error: "Lab ID and data are required" });
      }
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });
  

const deleteALab = asyncHandler(async (req, res) => {
    try {
        const labID = req.params.id;
        if (!labID) {
            res.status(404).json({ error: "Lab ID not provided" });
        } else {
            const rowsAffected = await database.deleteALab(labID);
            if (rowsAffected > 0) {
                res.status(200).json({ message: "Lab deleted successfully"});
            } else {
                res.status(404).json({ error: "Lab not found" });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

module.exports = {
  getAllLabs,
  getLabByID,
  createLab,
  updateALab,
  deleteALab,
};

