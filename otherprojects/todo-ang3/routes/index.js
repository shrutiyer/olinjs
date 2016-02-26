var express = require('express');
var path = require('path');
var Todo = require(path.join(__dirname,'../models/todoModel'));

var todos = {};

todos.getAll = function(req, res){
	Todo.find({}, function(err, todos){
		if(err){
			res.send(err);
		}

		res.json(todos);
	});
}

todos.add = function(req, res){
	var text = req.body.text;
	var newTodo = new Todo({text:text, done: false});
	newTodo.save(function(err, savedtodo){
		if(err){
			res.send(err);
		}
		Todo.find({}, function(err, todos){
			res.json(todos);
		})
	})
}

todos.edit = function(req, res){
	var id = req.params.todo_id;
	var text = req.body.text;
	console.log(req.body);
	Todo.update({_id: id}, {$set: {text: text}}, function(err, record){
		Todo.find({}, function(err, todos){
			console.log(todos);
			res.json(todos);
		})
	})
}

todos.delete = function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

	    // get and return all the todos after you create another
	    Todo.find(function(err, todos) {
	        if (err)
	            res.send(err)
	        res.json(todos);
    	});
    });
};


module.exports = todos;