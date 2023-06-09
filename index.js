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
// const url = "mongodb+srv://thisDeveloper:this.developer@cluster0.zyrgsbn.mongodb.net/?retryWrites=true&w=majority";
// const url = "mongodb://127.0.0.1:27017/university";

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
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/teacher", teacherRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}...`);
});
