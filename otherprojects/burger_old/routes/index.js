
var Ingredients = require('../models/ingredientModel.js');

var routes = {};

routes.home = function(req, res) {
  res.render('home', {'msg':'Under construction'});
}

routes.ingredients = function(req, res) {
  Ingredients.find({}, function(err, ing){
    res.render('ingredients', {'ingredients':ing});
  });
}

routes.addIngre = function(req, res) {
  var Ingredient = new Ingredients({name:req.body.name,cost:req.body.cost,available:true})
  //Making sure no errors 
  Ingredient.save(function (err) {
    if (err) {
      console.log("Problem saving ing", err);
    } else {
      console.log("Ing is done");
      res.send(Ingredient);
    }
  });
}

routes.editIngre = function(req, res) {
  console.log(req.body.id+" "+req.body.name);
  var cost = req.body.cost;
  var cost = cost.replace("- $","");
  console.log(cost);
  Ingredients.update({_id:req.body.id},{
    name:req.body.name, 
    cost:cost
  }, function(err, num, raw){
    console.log(raw);
  });
  // Making sure it gets updated
  Ingredients.find({_id:req.body.id}, function(err, ing){
    console.log(ing[0].name)
  });
}

routes.delIngre = function(req, res) {
  //Making sure no errors 
  console.log(req.body);
  Ingredients.findByIdAndRemove(req.body.id, function (err,data){
    console.log("DelPOST: "+data.name);
  });
}
 
module.exports.home = routes.home; 
module.exports.ingredients = routes.ingredients;
module.exports.addIngre = routes.addIngre;
module.exports.editIngre = routes.editIngre;
module.exports.delIngre = routes.delIngre;