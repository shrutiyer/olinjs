var $newIngredient = $("#newIngredient");
var $inStock = $(".allIngre");
var $div = $("#ing");
var $editbut = $('.edit'); 
var $delbut = $('.del');

var onSuccess = function(data, status) {
  var $newForm = $inStock.first().clone();
  console.log(data);
  $newForm.find('.name').html(data.name);
  $newForm.find('.cost').html(" - $"+data.cost);

  $div.append($newForm);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$newIngredient.submit(function(event) {
  event.preventDefault();
  var values = $newIngredient.serializeArray();
  var cost = values[1].value;
  var name = values[0].value;

  $.post("addIngre", {
    cost: cost,
    name: name
  })
    .done(onSuccess)
    .error(onError);
});

$editbut.click(function(event) {
  event.preventDefault();
  var id = this.id;
  var editId = "."+ id;
  var newName = $(editId).find(".editName").val();
  var newCost = "- $"+$(editId).find(".editCost").val();
  $(editId).find(".name").html(newName);
  $(editId).find(".cost").html(newCost);
  $.post("editIngre", {
    cost: newCost,
    name: newName,
    id: id
  })
});

$delbut.click(function(event) {
  event.preventDefault();
  var id = this.id;
  this.ingredient
  var delId = id.replace("del",".");//To remove from the database
  var sendId = id.replace("del","");//To remove from the database
  $(delId).remove();
  $.post("delIngre", {
    id: sendId
  })
});
