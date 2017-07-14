const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, 'northAmericaMeetings.json');
let meetings = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));

let slugs = [];
meetings.forEach((meeting) => {
  let meetingSlug = meeting.slug;
  let slugRegEx = new RegExp(`^(${meetingSlug})((-[0-9]*$)?)$`, 'i');
  let duplicateSlugs = 0;

  // check and see if there are any duplicates so far
  for (let i = 0; i < slugs.length; i++) {
    if (slugRegEx.test(slugs[i])) {
      duplicateSlugs += 1;
    }
  }

  // if there are any duplicates, update this entry's slug to make it unique
  if (duplicateSlugs > 0) {
    console.log(`${meeting.slug} is a duplicate; replacing with ${meetingSlug}-${duplicateSlugs + 1}`);
    // assign new slug name to duplicate slug
    meeting.slug = `${meetingSlug}-${duplicateSlugs + 1}`;
  }

  slugs.push(meetingSlug);
});

// destructively update sourcePath with deduped entries
fs.writeFileSync(sourcePath, JSON.stringify(meetings), 'utf-8', (err) => {
  if (err) console.error(err);
});
