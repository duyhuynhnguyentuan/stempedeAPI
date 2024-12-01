const asyncHandler = require("express-async-handler");
const { passwordConfig: SQLAuthentication, noPasswordConfig: PasswordlessConfig } = require('../config/config.js');
const { createDatabaseConnection } = require('../config/database.js');
const database = createDatabaseConnection(SQLAuthentication);
const getAllLabs = asyncHandler(async (req, res) => {
    try {
        const labs = await database.readAllLabs();
        console.log(`labs: ${JSON.stringify(labs)}`);
        res.status(200).json(labs);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

module.exports = {
    getAllLabs
};
