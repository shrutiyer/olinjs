var Users = require('../models/userModel.js');
var Tweets = require('../models/tweetModel.js');

var homeGET = function(req, res){
  res.render('home',{
    'msg':''
  });
};

module.exports.homeGET = homeGET;

var loginPOST = function(req, res){
  console.log(req.user.displayName);
  var username = req.user.displayName;
  var currUser = updateUser(username);
  console.log(currUser);
  Users.findOne({name:username},function(err, robots){
    console.log(robots);
  });
  res.redirect('/alltweets?valid='+currUser);
}

module.exports.loginPOST = loginPOST;

var alltweetsGET = function(req, res){
  var username = req.user.displayName;
  username = username.replace(' ','');
  var userMap = {}
  console.log(req.user.displayName);

  Tweets.find({}, function(err, tweets){
    
    tweets.forEach(function(tweet) {
      userMap[tweet.name] = 1;
    });
    userMap[username] = 1; //Making sure a new current user is added

    var uniqueUsers = Object.keys(userMap);
    var modifiedUsers = [];
    uniqueUsers.forEach(function(user){
      modifiedUsers.push({'name':user});
    })

    console.log(modifiedUsers);

    res.render('alltweets', {
      'username':username,
      'tweet': tweets.reverse(),
      'user': modifiedUsers
    });
  });
}

module.exports.alltweetsGET = alltweetsGET;

var tweetPOST = function(req, res){
  var tweet = req.body.tweet;
  var username = req.body.username;
  console.log(username);
  var Tweet = new Tweets({name: username, tweet: tweet});
  Tweet.save(function (err) {
    if (err) {
      console.log("Problem saving tweet", err);
    }
  });
  res.send(Tweet);
}

module.exports.tweetPOST = tweetPOST;

var deletePOST = function(req, res){
  var id = req.body.id;
  console.log("deletePOST "+id);
  Tweets.findOneAndRemove({_id: id}, function (err, data) {
    if (err) console.log('err:', err);
  });
}

module.exports.deletePOST = deletePOST;

var logoutPOST = function(req, res){
  res.render('home',{
    'msg': 'You have been logged out'
  })
}

module.exports.logoutPOST = logoutPOST;

/* HELPER FUNCTIONS */

// http://stackoverflow.com/questions/16882938/how-to-check-if-that-data-already-exist-in-the-database-during-update-mongoose
function updateUser(username){
  Users.find({name : username}, function (err, docs) {
    if (docs.length){
      console.log("Name exists");
    }else{
      console.log("Name doesn't exist");
      var User = new Users({name: username, online: true});
      User.save(function (err) {
        if (err) {
          console.log("Problem saving user", err);
        }
      });            
    }
  });
  return username;
}