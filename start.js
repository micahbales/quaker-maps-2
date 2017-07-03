const mongoose = require('mongoose');

// load environmental variables
require('dotenv').config();

// connect to our database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

// import models
require('./models/Meeting');

// start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express now running on port ${process.env.PORT}`);
});
