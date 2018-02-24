var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
let ENV;

try {
  ENV = require('./env');
} catch (ex) {
  ENV = process.env;
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

mongoose.connect(ENV.MONGODB_URI);

app.use('/api/v1/users', users);

module.exports = app;
