const fs = require('fs');
const sourceJSON = JSON.parse(fs.readFileSync('./north-america-meetings.json', 'utf-8'));
const newJSON = [];

// cycle through each entry from the source data
// add a re-formatted object to the new collection
sourceJSON.forEach((meeting) => {
  let newMeetingEntry =
    {
      "name": meeting.name,
      // the source data does not include a description, so let's create a stub
      "description": `${meeting.name} is a Quaker congregation in ${meeting.city}, ${meeting.state}.`,
      // TODO: use name property to create a unique slug
      // "slug",
      "city": meeting.city,
      "state": meeting.state,
      "zip": meeting.zip,
      "coordinates": {
        "lat": meeting.latitude,
        "lng": meeting.longitude
      },
      "address": meeting.address,
      // TODO: for last 3 attributes, should be array with multiple options (break at ',')
      "yearlymeeting": meeting.yearlymeeting,
      "branch": meeting.branch,
      "worshipstyle": meeting.worshipstyle
    };
    newJSON.push(JSON.stringify(newMeetingEntry));
});

// write re-formatted data to new collection
fs.writeFileSync('northAmericaMeetings.json', newJSON, 'utf-8', (err) => {
  if (err) console.error(err);
});
