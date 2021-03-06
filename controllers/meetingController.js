const mongoose = require('mongoose');
const Meeting = mongoose.model('Meeting');

exports.map = async (req, res) => {

  let yearlymeetings,
      states,
      worshipstyles,
      branches;

  await Meeting.find().distinct('yearlymeeting', (err, results) => {
    if (err) { console.error(err) }
    yearlymeetings = results.sort();
  });

  await Meeting.find().distinct('state', (err, results) => {
    if (err) { console.error(err) }
    states = results.sort();
  });

  await Meeting.find().distinct('worshipstyle', (err, results) => {
    if (err) { console.error(err) }
    worshipstyles = results.sort();
  });

  await Meeting.find().distinct('branch', (err, results) => {
    if (err) { console.error(err) }
    branches = results.sort();
  });

  const formFields = { yearlymeetings, states, worshipstyles, branches };

  res.render('map', { title: 'Quaker Meetings in North America', formFields });
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

exports.mapOneMeeting = async (req, res) => {
  const slug = req.params.slug;
  const meetings = await Meeting.find({ slug }, '-location.type, -created, -__v');
  res.json(meetings);
};

exports.searchMeetings = async (req, res) => {
  // searchKeys are criteria we are searching (e.g. ['yearlymeeting', 'state'])
  const searchKeys = Object.keys(req.query);

  // searchValues are values of that criteria (e.g. ['Philadelphia YM', 'DE'])
  const searchValues = Object.values(req.query);

  // create key/value pairs: { yearlymeeting : 'Philadelphia YM', ... }
  const searchCriteria = {};
  searchKeys.forEach((key, index) => {
    searchCriteria[key] = searchValues[index];
  });

  // single or multi criteria: {yearlymeeting : 'Philadelphia YM', state : 'DE'}
  const meetings = await Meeting.find(searchCriteria,
                                      '-location.type, -created, -__v');

  res.json(meetings);
};
