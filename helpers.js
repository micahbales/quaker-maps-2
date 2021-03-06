const fs = require('fs');

exports.siteName = 'Quaker Maps';

// display icons by name
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// auto-populate menu items
exports.menu = [
  { slug: '/map', title: 'Map', fa: 'globe', },
  { slug: '/meetings', title: 'Meetings', fa: 'users' },
  { slug: '/meetings/add', title: 'Add Meeting', fa: 'plus-square' }
];

// moment.js displays nicely-formatted dates. This requires it for use in our templates
exports.moment = require('moment');

// dump raw JSON into the view, for debugging purposes
exports.dump = (obj) => JSON.stringify(obj, null, 2);
