//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var userSchema = mongoose.Schema({
  name: String,
  online: Boolean
});

module.exports = mongoose.model("user", userSchema);