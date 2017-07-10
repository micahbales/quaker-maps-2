const fs = require('fs');

exports.siteName = 'Quaker Maps';

// display icons by name
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// auto-populate menu items
exports.menu = [
  { slug: '/map', title: 'Maps', fa: 'globe', },
  { slug: '/meetings', title: 'Meetings', fa: 'users' }
];

// dump raw JSON into the view, for debugging purposes
exports.dump = (obj) => JSON.stringify(obj, null, 2);
