const mongoose = require('mongoose');
const Meeting = mongoose.model('Meeting');

exports.map = (req, res) => {
  res.render('map', { title: 'Map' });
};

exports.getMeetings = async (req, res) => {
  const meetings = await Meeting.find();

  res.render('meetings', { title: 'All Meetings', meetings });
};

exports.getMeetingBySlug = async (req, res, next) => {
  const meeting = await Meeting.findOne({ slug: req.params.slug });
  if (!meeting) return next();

  res.render('meeting', { title: meeting.name, meeting });
};

exports.addMeeting = (req, res) => {
  // create empty object to recieve meeting data from form
  const meeting = {};

  res.render('editMeeting', { title: 'Add Meeting', meeting } );
};

exports.createMeeting = async (req, res) => {
  const meeting = new Meeting(req.body);
  await meeting.save();

  req.flash('success', `${meeting.name} has been created!`);
  res.redirect(`/meetings/${meeting.slug}`);
};

exports.deleteMeeting = async (req, res) => {
  const slug = req.params.slug;
  const meeting = await Meeting.remove({ slug });
  req.flash('success', 'meeting successfully deleted!');
  res.redirect(`/meetings`);
};
