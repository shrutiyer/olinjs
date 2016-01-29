var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var cat_names = ['Georje','Carel','Mari','Breanne','Naincy'];
var cat_colors = ['red', 'green', 'blue', 'orange', 'yellow'];

//function that constructs and returns cat object
function Cat(){
  var cat = {name: cat_names[Math.floor(Math.random()*cat_names.length)],
             age: Math.floor(Math.random() * 6),
             color: cat_colors[Math.floor(Math.random()*cat_colors.length)]
  };
  return cat;
}

function getAllCats(){
  var cats_list = db.getAll();
  
  cats_list.sort(function(a, b) { 
    return a.age - b.age;
  })
  return cats_list;
}

router.get('/', function(req, res, next){
  res.render("home", {"links": [
    {mpath:"/cats/new",text:"Create a new cat!"},
    {mpath:"/cats",text:"Here are all your cats"},
    {mpath:"/cats/delete/old",text:"Remove the old cat?"},
    {mpath:"/cats/bycolor/red",text:"Wait, do I have red cats"}
    ]
  });
});

//get all cat names
router.get('/cats', function(req, res, next){
  var cats = getAllCats();  
  var msg = "Here are the cats in the cat island:</br>";

  cats.forEach(function(catas){
    msg = msg + "Cat named " + catas.name + " which is " + catas.age + 
    " years old and the color " + catas.color + "</br>" ;
  });
  res.send(msg);
});

// create new cat randomly named 
router.get('/cats/new', function(req, res, next) {
  db.add(Cat());
  res.send("Added cat!");
});

router.get('/cats/bycolor/:color', function(req, res) {
  var cats = getAllCats();
  var cats_filtr = cats.filter(function(item){
    return item.color === req.params.color;
  });
  var msg = "Here are the color cats:</br>";
  cats_filtr.forEach(function(catas){
    msg = msg + "Cat named " + catas.name + " which is " + catas.age + 
    " years old and the color " + catas.color + "</br>" ;
  });
  res.send(msg);
});

// delete the oldest cat
router.get('/cats/delete/old', function(req, res, next) {
  var cat_del = db.remove(0);

  if (cat_del.length !== 0) {
    res.send(cat_del[0].name + " has been sent to a far away place");
  }else{
    res.send("No more cats to delete");
  }
});

module.exports = router;