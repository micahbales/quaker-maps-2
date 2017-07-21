const fs = require('fs');
const path = require('path');

const dedupe = (writePath) => {
  let meetings = JSON.parse(fs.readFileSync(writePath, 'utf-8'));
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

  // destructively update writePath with deduped entries
  fs.writeFileSync(writePath, JSON.stringify(meetings), 'utf-8', (err) => {
    if (err) console.error(err);
  });
}

module.exports = dedupe;
