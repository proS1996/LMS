// config/swagger.js
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Banking API",
      version: "1.0.0",
      description: "Banking services API documentation",
      contact: {
        name: "pankaj-honey",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
