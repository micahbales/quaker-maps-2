const express = require('express');
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

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

/* Error Handlers: */

// If the above routes don't work, 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Check if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// If not, this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler (no stack trace)
app.use(errorHandlers.productionErrors);

module.exports = app;
