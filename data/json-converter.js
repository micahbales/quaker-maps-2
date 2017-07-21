const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, 'north-america-meetings.json');
const writePath = path.join(__dirname, 'northAmericaMeetings.json');
const sourceJSON = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
const newJSON = [];
const slugs = require('slugs');
const mongoose = require('mongoose');
const dedupe  = require('./dedupe');

// cycle through each entry from the source data
// add a re-formatted object to the new collection
sourceJSON.forEach((meeting) => {

  let newMeetingEntry =
    {
      "_id": mongoose.Types.ObjectId(),
      "name": meeting.name,
      // the source data does not include a description, so let's create a stub
      "description": `${meeting.name} is a Quaker congregation in ${meeting.city}, ${meeting.state}.`,
      "slug": slugs(meeting.name),
      "city": meeting.city,
      "state": meeting.state,
      "zip": meeting.zip,
      "location": {
        "coordinates": {
          "lng": meeting.longitude,
          "lat": meeting.latitude,
        },
        "address": meeting.address
      },
      // last 3 attributes are arrays with multiple options
      "yearlymeeting": meeting.yearlymeeting ? meeting.yearlymeeting.split(', ') : ["Unaffiliated"],
      "branch": meeting.branch ? meeting.branch.split(', ') : ["Unaffiliated"],
      "worshipstyle": meeting.worshipstyle ? meeting.worshipstyle.split(', ') : ["Unaffiliated"]
    };
    newJSON.push(JSON.stringify(newMeetingEntry));
});

// write re-formatted data to new collection
fs.writeFileSync(writePath, `[${newJSON}]`, 'utf-8', (err) => {
  if (err) console.error(err);
});

// ensure that each slug is unique
dedupe(writePath);
