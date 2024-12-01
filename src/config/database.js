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
    request.input('LabID', sql.Int, data.LabID )
    request.input('LabName', sql.NVarChar(255), data.LabName);
    request.input('Description', sql.NVarChar(255), data.Description);
    request.input('LabFileURL', sql.NVarChar(255), data.LabFileURL);
    const result = await request.query(
      `INSERT INTO Labs (LabID, LabName, Description, LabFileURL) VALUES (@LabID, @LabName, @Description, @LabFileURL)`
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
