// import environmental variables so we can connect to the database
require('dotenv').config({ path: __dirname + '/../.env' });

const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import Meeting model
const Meeting = require('../models/Meeting');

// JSON must be parsed every time it is retrieved from source file
const meetings = JSON.parse(fs.readFileSync(__dirname + '/northAmericaMeetings.json', 'utf-8'));

async function loadMeetings() {
  try {
    await Meeting.insertMany(meetings);
    console.log('Done!');
    process.exit();
  } catch(e) {
    console.log(e);
    process.exit();
  }

};

loadMeetings();
