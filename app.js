const express = require('express');
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const helpers = require('./helpers');

// view engine setup
app.set('view engine', 'pug');

// serve up static files from 'public'
app.use(express.static('public'));

// takes raw requests and converts them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import helpers
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.currentPath = req.path;
  next();
});

// after middlewares, let's handle our routes:
app.use('/', routes);

module.exports = app;
