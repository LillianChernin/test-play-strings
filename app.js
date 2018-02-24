const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// const users = require('./routes/users');
const index = require('./')

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

// app.use('/api/v1/users', users);
app.use('/', index)

module.exports = app;
