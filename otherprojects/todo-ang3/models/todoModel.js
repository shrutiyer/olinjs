var mongoose = require('mongoose');

// Create a schema
var todoSchema = mongoose.Schema({
    text : String,
    done : Boolean
});

module.exports  = mongoose.model('todo', todoSchema);
