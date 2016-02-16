var mongoose = require('mongoose');

// Create a Schema
var tweetSchema = mongoose.Schema({
  name: String,
  tweet: String
});

module.exports = mongoose.model("tweet", tweetSchema);