/*
 * Specific resources used:
 * https://docs.angularjs.org/api/ng/filter/filter
 * https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
 * http://jsfiddle.net/timriley/GVCP2
 */
var express  = require('express');
var app      = express(); 
var mongoose = require('mongoose');  
var morgan = require('morgan');  
var bodyParser = require('body-parser');  
var methodOverride = require('method-override'); 

var todos = require('./routes/index');

mongoose.connect('mongodb://localhost/users');    
 
app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
    
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/api/todos', todos.getAll);
app.post('/api/todos', todos.add);
app.delete('/api/todos/:todo_id', todos.delete);
app.post('/api/todos/:todo_id', todos.edit);

app.listen(3000);
console.log("App listening on port 3000");