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
  async readAllLabs() {
    const request = this.poolconnection.request();
    const result = await request.query('SELECT * FROM Labs');

    return result.recordsets[0];
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