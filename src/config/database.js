//config/database.js
const sql = require('mssql');
let database = null;

class Database {
  config = {};
  poolconnection = null;
  connected = false;

  constructor(config) {
    this.config = config;
  }

  async connect() {
    try {
      this.poolconnection = await sql.connect(this.config);
      this.connected = true;
      console.log('Database connected successfully.');
      return this.poolconnection;
    } catch (error) {
      console.error('Error connecting to the database:', error);
      this.connected = false;
    }
  }

  async disconnect() {
    try {
      if (this.connected) {
        await this.poolconnection.close();
        this.connected = false;
        console.log('Database disconnected successfully.');
      }
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
    }
  }

  async executeQuery(query) {
    const request = this.poolconnection.request();
    const result = await request.query(query);

    return result.rowsAffected[0];
  }

  ///LABS SQL Query
  async createLab(data) {
    const request = this.poolconnection.request();
    // request.input('LabID', sql.Int, data.LabID )
    request.input('LabName', sql.NVarChar(255), data.LabName);
    request.input('Description', sql.NVarChar(255), data.Description);
    request.input('LabFileURL', sql.NVarChar(255), data.LabFileURL);
    const result = await request.query(
      `INSERT INTO Labs (LabName, Description, LabFileURL) VALUES (@LabName, @Description, @LabFileURL)`
    );

    return result.rowsAffected[0];
  }
  async readAllLabs() {
    const request = this.poolconnection.request();
    const result = await request.query('SELECT * FROM Labs');

    return result.recordsets[0];
  }
  async readALab(id){
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query(`SELECT * FROM Labs WHERE LabID = @id`);
    return result.recordset[0];
  }
  async updateALab(id, data) {
    const request = this.poolconnection.request();

    request.input('id', sql.Int, +id)
    request.input('LabName', sql.NVarChar(255), data.LabName);
    request.input('Description', sql.NVarChar(255), data.Description);
    request.input('LabFileURL', sql.NVarChar(255), data.LabFileURL);

    const result = await request.query(
      `UPDATE Labs SET LabName=@LabName, Description=@Description, LabFileURL=@LabFileURL WHERE LabID = @id`
    );

    return result.rowsAffected[0];
  }
  async deleteALab(id) {
    const idAsNumber = Number(id);

    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, idAsNumber)
      .query(`DELETE FROM Labs WHERE LabID = @id`);

    return result.rowsAffected[0];
  }
  // Add these methods to your `Database` class

// Read user by username (for login)
async readUserByUsername(username) {
    const request = this.poolconnection.request();
    const result = await request
      .input('Username', sql.NVarChar(50), username)
      .query('SELECT * FROM Users WHERE Username = @Username');
    return result.recordset[0];  // Returns the first matching user (or undefined if no match)
  }
  
  // Create user (for registration)
  async createUser(user) {
    const request = this.poolconnection.request();
    request.input('FullName', sql.NVarChar(255), user.FullName);
    request.input('Username', sql.NVarChar(50), user.Username);
    request.input('Password', sql.NVarChar(255), user.Password); // This should be the hashed password
    request.input('Email', sql.NVarChar(255), user.Email);
    request.input('Phone', sql.NVarChar(255), user.Phone);
    request.input('Address', sql.NVarChar(255), user.Address);
    request.input('Status', sql.Bit, user.Status);
    request.input('IsExternal', sql.Bit, user.IsExternal);
    request.input('ExternalProvider', sql.NVarChar(50), user.ExternalProvider);
  
    const result = await request.query(`
      INSERT INTO Users (FullName, Username, Password, Email, Phone, Address, Status, IsExternal, ExternalProvider)
      VALUES (@FullName, @Username, @Password, @Email, @Phone, @Address, @Status, @IsExternal, @ExternalProvider)
    `);
  
    return result.rowsAffected[0];  // Returns the number of affected rows
  }
  
}

// CommonJS export
const createDatabaseConnection = async (passwordConfig) => {
  database = new Database(passwordConfig);
  await database.connect();
//   await database.createTable();
  return database;
};

module.exports = {
  createDatabaseConnection,
  Database
};
