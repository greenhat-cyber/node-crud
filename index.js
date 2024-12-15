const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const teacherRoute = require("./routes/teacher");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");

const app = express();

// Validate environment variables
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/test";
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Updated to OpenAPI 3.0.0
    info: {
      title: "Node CRUD API",
      version: "1.0.0",
      description: "API documentation for the Node CRUD application",
      contact: {
        name: "Developer",
        email: "developer@example.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Define the path to your route files
};


mongoose.connect(MONGODB_URL).then(() => {
  console.log("Connected to the database");
}).then(() => {
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
  });
}).catch((err) => {
  console.log(err);
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Default route to redirect to Swagger documentation
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Routes
app.use("/teacher", teacherRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
