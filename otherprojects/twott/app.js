var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var auth = require('./oauth');
var User = require('./models/userModel');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: auth.facebook.clientID,
    clientSecret: auth.facebook.clientSecret,
    callbackURL: auth.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

var app = express();
mongoose.connect('mongodb://localhost/users');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'SantaHorse',
  resave: false,
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// you can handle this in index.js API file instead of here it is conventionally better
app.get("/", function(req, res){
  var sess = req.session;
  //console.log(sess);
  if (!sess.username) {
    res.render('home',{'msg':''});
  } else {
    res.redirect("/alltweets");
  }
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/alltweets',
                                      failureRedirect: '/' })
);

app.get('/', index.homeGET);
app.post('/login', ensureAuthenticated, index.loginPOST);
app.get('/alltweets', ensureAuthenticated, index.alltweetsGET);
app.post('/tweet', ensureAuthenticated, index.tweetPOST);
// delete does not work asynchronously - I have to refresh to be able to delete a twotte, otherwise it seems like 
// nothing is happening...
app.post('/delete', index.deletePOST);
app.post('/logout', index.logoutPOST);

app.get('/user', ensureAuthenticated, function(req, res) {
  res.send(req.user);
})

app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}