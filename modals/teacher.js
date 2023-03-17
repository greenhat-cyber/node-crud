const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  qualification: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("teachers", teacherSchema);
