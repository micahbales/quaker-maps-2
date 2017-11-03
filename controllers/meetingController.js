const mongoose = require('mongoose');
const Meeting = mongoose.model('Meeting');

exports.map = (req, res) => {
  res.render('map', { title: 'Quaker Meetings in North America' });
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

exports.editMeeting = async (req, res) => {
  const _id = req.params.id;
  const meeting = await Meeting.findOne({ _id });
  res.render('editMeeting', { title: `Update ${meeting.name}`, meeting})
};

exports.updateMeeting = async (req, res) => {
  const _id = req.params.id
  let meeting = await Meeting.findOneAndUpdate({ _id }, req.body, {
    new: true, // return new meeting values rather than the old ones
    runValidators: true
    // TODO: sanitize inputs
  });

  // ensure that the icon attribute accords with the first string in meeting.yearlymeeting
  const yearlymeetingSlug = meeting.yearlymeeting[0].toLowerCase().replace(/[^A-z0-9]/g, '');
  meeting.icon = `${yearlymeetingSlug}.png`;
  meeting.save();

  req.flash('success', 'meeting successfully updated!');
  res.redirect(`/meetings/${meeting.slug}`);
};

exports.deleteMeeting = async (req, res) => {
  const _id = req.params.id;
  const meeting = await Meeting.remove({ _id });
  req.flash('success', 'meeting successfully deleted!');
  res.redirect(`/meetings`);
};

/** API **/

exports.mapAllMeetings = async (req, res) => {
  const meetings = await Meeting.find({}, '-location.type, -created, -__v');
  res.json(meetings);
}

exports.mapOneMeeting = async (req, res) => {
  const slug = req.params.slug;
  const meetings = await Meeting.find({ slug }, '-location.type, -created, -__v');
  res.json(meetings);
};

exports.searchMeetings = async (req, res) => {
  // searchKey is the criteria we are searching (e.g. yearlymeeting)
  const searchKey = req.params.slug;

  // searchValue is the value of that criteria (e.g. 'Philadelphia YM')
  const searchValue = req.query.id;

  // create key/value pair: { yearlymeeting : 'Philadelphia YM' }
  const searchCriteria = {};
  searchCriteria[searchKey] = searchValue;

  const meetings = await Meeting.find(searchCriteria);

  res.json(meetings);
};
