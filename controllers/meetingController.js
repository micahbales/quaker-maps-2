const mongoose = require('mongoose');
const Meeting = mongoose.model('Meeting');

exports.map = (req, res) => {
  res.render('map', { title: 'Map' });
}

exports.addMeeting = (req, res) => {
  res.render('addMeeting', { title: 'Add Meeting'} );
}
