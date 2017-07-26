const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// view engine setup
app.set('view engine', 'pug');

// serve up static files from 'public'
app.use(express.static('public'));

// takes raw requests and converts them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populates req.cookies with any cookies that came long with the request
app.use(cookieParser());

// sessions allow storing of data between requests
// this allows us to use flash messages, for example
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// add flash messages
app.use(flash());

// pass helpers & flashes to templates
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
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
