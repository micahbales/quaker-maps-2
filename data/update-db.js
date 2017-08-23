/**
INSTRUCTIONS FOR USE:
1. To remove all records and re-seed from local data, use `node update-db`
2. To remove all records, but not re-seed, use the `--nuke` flag
3. To re-seed, but not remove records from the collection, use `--seed`
**/

// import environmental variables so we can connect to the database
require('dotenv').config({ path: __dirname + '/../.env' });

const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import Meeting model
const Meeting = require('../models/Meeting');

/* Load records to be added to a collection
   (JSON must be parsed every time it is retrieved from source file) */
const meetings = JSON.parse(fs.readFileSync(__dirname + '/northAmericaMeetings.json', 'utf-8'));

async function nukeCollection(collection) {
  try {
    await collection.remove();
    console.log('Collection Nuked!');
  } catch(e) {
    console.log(e);
    process.exit();
  }
};

async function loadCollectionRecords(collection, records) {
  try {
    await collection.insertMany(records);
    console.log('Collection Loaded!');
  } catch(e) {
    console.log(e);
    process.exit();
  }
};

if (process.argv[2] === '--nuke') {
  nukeCollection(Meeting);
} else if (process.argv[2] === '--seed') {
  loadCollectionRecords(Meeting, meetings);
} else {
  nukeCollection(Meeting);
  loadCollectionRecords(Meeting, meetings);
}

/* Close the process after 3 seconds
   (There should be a more elegant way to do this,
   but this will do for now) */
setInterval(() => {
  process.exit();
}, 3000);
