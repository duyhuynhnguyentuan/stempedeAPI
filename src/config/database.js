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

///AUTHORIZATION
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
// Fetch all users from the Users table
async fetchAllUsers() {
    const request = this.poolconnection.request();
    const result = await request.query('SELECT * FROM Users');
    return result.recordsets[0];  // Returns all users in the Users table
  }
  ///Order
  async createOrder(data) {
    const request = this.poolconnection.request();
    request.input('UserID', sql.Int, data.UserID);
    request.input('OrderDate', sql.Date, data.OrderDate);
    request.input('TotalAmount', sql.Decimal(10, 2), data.TotalAmount);
    
    const result = await request.query(
      `INSERT INTO Orders (UserID, OrderDate, TotalAmount) 
       VALUES (@UserID, @OrderDate, @TotalAmount)`
    );
  
    return result.rowsAffected[0];
  }
  async readAllOrders() {
    const request = this.poolconnection.request();
    const result = await request.query('SELECT * FROM Orders');
    return result.recordsets[0];
  }
  async readOrderByID(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query('SELECT * FROM Orders WHERE OrderID = @id');
    return result.recordset[0];
  }
  async updateOrder(id, data) {
    const request = this.poolconnection.request();
    request.input('id', sql.Int, id);
    request.input('UserID', sql.Int, data.UserID);
    request.input('OrderDate', sql.Date, data.OrderDate);
    request.input('TotalAmount', sql.Decimal(10, 2), data.TotalAmount);
  
    const result = await request.query(
      `UPDATE Orders 
       SET UserID = @UserID, OrderDate = @OrderDate, TotalAmount = @TotalAmount
       WHERE OrderID = @id`
    );
  
    return result.rowsAffected[0];
  }
  async deleteOrder(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, id)
      .query('DELETE FROM Orders WHERE OrderID = @id');
    return result.rowsAffected[0];
  }
  ///orders details 
  async createOrderDetail(data) {
    const request = this.poolconnection.request();
    request.input('OrderID', sql.Int, data.OrderID);
    request.input('ProductID', sql.Int, data.ProductID);
    request.input('ProductDescription', sql.NVarChar(sql.MAX), data.ProductDescription);
    request.input('Quantity', sql.Int, data.Quantity);
    request.input('Price', sql.Decimal(10, 2), data.Price);
  
    const result = await request.query(
      `INSERT INTO OrderDetails (OrderID, ProductID, ProductDescription, Quantity, Price) 
       VALUES (@OrderID, @ProductID, @ProductDescription, @Quantity, @Price)`
    );
  
    return result.rowsAffected[0];
  }
  async readAllOrderDetails() {
    const request = this.poolconnection.request();
    const result = await request.query('SELECT * FROM OrderDetails');
    return result.recordsets[0];
  }
  async readOrderDetailByID(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query('SELECT * FROM OrderDetails WHERE OrderDetailID = @id');
    return result.recordset[0];
  }
  async updateOrderDetail(id, data) {
    const request = this.poolconnection.request();
    request.input('id', sql.Int, id);
    request.input('OrderID', sql.Int, data.OrderID);
    request.input('ProductID', sql.Int, data.ProductID);
    request.input('ProductDescription', sql.NVarChar(sql.MAX), data.ProductDescription);
    request.input('Quantity', sql.Int, data.Quantity);
    request.input('Price', sql.Decimal(10, 2), data.Price);
  
    const result = await request.query(
      `UPDATE OrderDetails
       SET OrderID = @OrderID, ProductID = @ProductID, ProductDescription = @ProductDescription, 
           Quantity = @Quantity, Price = @Price
       WHERE OrderDetailID = @id`
    );
  
    return result.rowsAffected[0];
  }
  async deleteOrderDetail(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, id)
      .query('DELETE FROM OrderDetails WHERE OrderDetailID = @id');
    return result.rowsAffected[0];
  }
  ///Products
  async createProduct(data) {
    const request = this.poolconnection.request();
    request.input('ProductName', sql.NVarChar(255), data.ProductName);
    request.input('Description', sql.NVarChar(sql.MAX), data.Description);
    request.input('ImagePath', sql.VarChar(100), data.ImagePath);
    request.input('Price', sql.Decimal(10, 2), data.Price);
    request.input('StockQuantity', sql.Int, data.StockQuantity);
    request.input('Ages', sql.NChar(10), data.Ages);
    request.input('SupportInstances', sql.Int, data.SupportInstances);
    request.input('LabID', sql.Int, data.LabID);
    request.input('SubcategoryID', sql.Int, data.SubcategoryID);
  
    const result = await request.query(
      `INSERT INTO Products (ProductName, Description, ImagePath, Price, StockQuantity, Ages, SupportInstances, LabID, SubcategoryID)
       VALUES (@ProductName, @Description, @ImagePath, @Price, @StockQuantity, @Ages, @SupportInstances, @LabID, @SubcategoryID)`
    );
  
    return result.rowsAffected[0];
  }
  async readAllProducts() {
    const request = this.poolconnection.request();
    const result = await request.query('SELECT * FROM Products');
    return result.recordsets[0];
  }
  async readProductByID(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query('SELECT * FROM Products WHERE ProductID = @id');
    return result.recordset[0];
  }
  async updateProduct(id, data) {
    const request = this.poolconnection.request();
    request.input('id', sql.Int, id);
    request.input('ProductName', sql.NVarChar(255), data.ProductName);
    request.input('Description', sql.NVarChar(sql.MAX), data.Description);
    request.input('ImagePath', sql.VarChar(100), data.ImagePath);
    request.input('Price', sql.Decimal(10, 2), data.Price);
    request.input('StockQuantity', sql.Int, data.StockQuantity);
    request.input('Ages', sql.NChar(10), data.Ages);
    request.input('SupportInstances', sql.Int, data.SupportInstances);
    request.input('LabID', sql.Int, data.LabID);
    request.input('SubcategoryID', sql.Int, data.SubcategoryID);
  
    const result = await request.query(
      `UPDATE Products
       SET ProductName = @ProductName, Description = @Description, ImagePath = @ImagePath,
           Price = @Price, StockQuantity = @StockQuantity, Ages = @Ages, SupportInstances = @SupportInstances,
           LabID = @LabID, SubcategoryID = @SubcategoryID
       WHERE ProductID = @id`
    );
  
    return result.rowsAffected[0];
  }
  async deleteProduct(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, id)
      .query('DELETE FROM Products WHERE ProductID = @id');
    return result.rowsAffected[0];
  }
  ///subCategory
  async createSubcategory(data) {
    const request = this.poolconnection.request();
    request.input('SubcategoryName', sql.VarChar(100), data.SubcategoryName);
    request.input('Description', sql.VarChar(sql.MAX), data.Description);
  
    const result = await request.query(
      `INSERT INTO Subcategories (SubcategoryName, Description)
       VALUES (@SubcategoryName, @Description)`
    );
  
    return result.rowsAffected[0];
  }
  async readAllSubcategories() {
    const request = this.poolconnection.request();
    const result = await request.query('SELECT * FROM Subcategories');
    return result.recordsets[0];
  }
  async readSubcategoryByID(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query('SELECT * FROM Subcategories WHERE SubcategoryID = @id');
    return result.recordset[0];
  }
  async updateSubcategory(id, data) {
    const request = this.poolconnection.request();
    request.input('id', sql.Int, id);
    request.input('SubcategoryName', sql.VarChar(100), data.SubcategoryName);
    request.input('Description', sql.VarChar(sql.MAX), data.Description);
  
    const result = await request.query(
      `UPDATE Subcategories
       SET SubcategoryName = @SubcategoryName, Description = @Description
       WHERE SubcategoryID = @id`
    );
  
    return result.rowsAffected[0];
  }
  async deleteSubcategory(id) {
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, id)
      .query('DELETE FROM Subcategories WHERE SubcategoryID = @id');
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
