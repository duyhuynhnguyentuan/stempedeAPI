const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const port = 8000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "STEMPEDE API",
      version: "1.0.0",
      description: "A Express API made by HNTD for SWP project, not by some dumbasses dont even know how to deploy them shit",
      contact: {
        "name": "Our API Support",
        "email": "duyhntse170187@fpt.edu.vn"
      },
    },
    servers: [
      {
        url: "https://stempedeapi.onrender.com",
        description: "Production server",
      },
      {
        url: "/api-docs",
        description: "Development server",
      }
    ],
  },
  apis: ["./src/routers/*.js", "./src/models/*.js"],
};
//router import
const labsRouter = require('./routers/labs');
const authRouter = require('./routers/auth');
const ordersRouter = require('./routers/orders');
const ordersDetailRouter = require('./routers/orderDetail')
const productsRouter = require('./routers/products');
const subcategoriesRouter = require('./routers/subcategories');
//routes 
// const pathToSpec = join(__dirname, './openApiSchema.yml');
// const openApiSpec = yaml.load(pathToSpec);
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204, 
}));
app.use(express.json());
app.use("/api/v1/labs", labsRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/orders", ordersRouter)
app.use("/api/v1/orderdetails", ordersDetailRouter)
app.use("/api/v1/products", productsRouter)
app.use("/api/v1/subcategories", subcategoriesRouter)
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
