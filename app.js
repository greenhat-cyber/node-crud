const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const teacherRoute = require('./routes/teacher');

const app = express();
const url = "mongodb://127.0.0.1:27017/university";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(url).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log(err);
});

app.use('/teacher', teacherRoute);

app.listen(5000, () => {
  console.log('Server started on port 5000...');
});
