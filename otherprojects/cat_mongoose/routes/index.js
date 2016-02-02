/*
This file contains the routes to all pages
"/home": Home with all the links
"/cats": Lists all the cats
"/cats/bycolor/:color": Sorts by color specified
"/cats/delete/old": Removes oldest cat
"/"
*/
var express = require('express');
var router = express.Router();
var Catdb = require('../models/catModel.js');

//Array of Cat names and colors
var cat_names = ['Georje','Carel','Mari','Breanne','Naincy'];
var cat_colors = ['red', 'green', 'blue', 'orange', 'yellow'];

//function that constructs and returns cat object
function Cat(){
  var cat = {name: cat_names[Math.floor(Math.random()*cat_names.length)],
             // Randomly chooses name age and color
             age: Math.floor(Math.random() * 6),
             color: cat_colors[Math.floor(Math.random()*cat_colors.length)]
  };
  return cat;
}

// HOME Page
router.get('/', function(req, res, next){
  res.render("home", {"links": [
    {mpath:"/cats/new",text:"Create a new cat!"},
    {mpath:"/cats",text:"Here are all your cats"},
    {mpath:"/cats/delete/old",text:"Remove the old cat?"},
    {mpath:"/cats/bycolor/red",text:"Wait, do I have red cats"},
    {mpath:"/cats/byage/1",text:"Cats older than 1 years"}
  ]});
});

//ALL cat names Page
router.get('/cats', function(req, res, next){
  var msg = "Here are the cats in the cat island:</br>";

  Catdb.find(function(err, cats){
    // Checking for non zero number of cats
    if (cats.length>0){
      // Looping through and adding to the message
      cats.forEach(function(catas){
        msg = msg + "Cat named " + catas.name + " which is " + catas.age + 
       " years old and the color " + catas.color + "</br>" ;
      });
    }else{
      msg = "Create some cats"
    }   
    res.send(msg);
  });
});

// create new cat randomly named 
router.get('/cats/new', function(req, res, next) {
  
  var bob = new Catdb(Cat());
  
  //Making sure no errors
  bob.save(function (err) {
    if (err) {
      console.log("Problem saving cat", err);
    } else {
      console.log("Cat is done");
    }
  });
  
  res.send("Added cat!");
});

// Sorting by color of the cat
router.get('/cats/bycolor/:color', function(req, res) {
  
  Catdb.find({'color': req.params.color}, function(err, cats){
    var msg = "Here are the color cats:</br>";
    
    //Again, checking  to make sure it exists
    if (cats.length>0){
        cats.forEach(function(catas){
          msg = msg + "Cat named " + catas.name + " which is " + catas.age + 
          " years old and the color " + catas.color + "</br>" ;
        });
    }else{
      //Else tell the users no more cats
      msg = "No "+ req.params.color.toString() + " colored cats";
    }
    res.send(msg);
    }
  );
});

// delete the oldest cat by age
router.get('/cats/delete/old', function(req, res, next) {
  Catdb.find(function(err,cat_del){
    var lar = Math.max.apply(Math,cat_del.map(function(o){
      return o.age;
    }));

  Catdb.findOneAndRemove({age:lar}, function(error, doc, result){
      if (error){
        res.send("No more cats to delete");
      }else {
        res.send("Cat has been deleted");
      }
  });
  })
})

router.get('/cats/byage/:age', function(req, res) {
  
  Catdb.find({'age': {$gt: req.params.age}}, function(err, cats){
    var msg = "Here are the color cats:</br>";
    
    if (cats.length>0){
        cats.forEach(function(catas){
          msg = msg + "Cat named " + catas.name + " which is " + catas.age + 
          " years old and the color " + catas.color + "</br>" ;
        });
    }else{
      msg = "No "+ req.params.color.toString() + " colored cats";
    }
    res.send(msg);
    }
  );
});

module.exports = router;