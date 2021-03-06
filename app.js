const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

// const users = require('./routes/users');
const index = require('./routes/index')

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: ENV.SESSION_SECRET, cookie: { maxAge: 60000 }}))

mongoose.connect(ENV.MONGODB_URI);

// app.use('/api/v1/users', users);
app.use('/', index)

module.exports = app;
