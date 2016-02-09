var exphbs = require('express-handlebars');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');

mongoose.connect('mongodb://localhost/burger');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/ingredients', index.ingredients);
app.post('/addIngre', index.addIngre);
app.post('/editIngre', index.editIngre);
app.post('/delIngre', index.delIngre);

app.listen(3000);