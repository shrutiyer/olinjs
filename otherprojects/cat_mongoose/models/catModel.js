var mongoose = require('mongoose');

// Cat Schema with name age and color
var catSchema = mongoose.Schema({
  name: String,
  age: Number,
  color: String
});

module.exports = mongoose.model("cat", catSchema);