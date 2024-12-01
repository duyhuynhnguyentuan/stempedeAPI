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
        description: "Development server",
      },
      {
        url: "/api-docs",
        description: "Production server",
      }
    ],
  },
  apis: ["./src/routers/*.js", "./src/models/*.js"],
};
//router import
const labsRouter = require('./routers/labs');
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
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
