const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const teacherRoute = require("./routes/teacher");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");

const app = express();
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Node Crud Api",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


app.use("/teacher", teacherRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}...`);
});