const mongoose = require('mongoose');
const Meeting = mongoose.model('Meeting');

exports.map = (req, res) => {
  res.render('map', { title: 'Map' });
}

exports.addMeeting = (req, res) => {
  // create empty object to recieve meeting data from form
  const meeting = {};
  res.render('editMeeting', { title: 'Add Meeting', meeting } );
}

exports.createMeeting = async (req, res) => {
  // TODO: handle for errors with higher level function
  const meeting = new Meeting(req.body);
  await meeting.save();
  res.redirect('/');
}
