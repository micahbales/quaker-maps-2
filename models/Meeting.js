const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Your meeting must have a name'
  },
  slug: String,
  city: String,
  state: String,
  zip: Number,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: Number,
      required: 'You must supply coordinates'
    },
    address: {
      type: String,
      required: 'Your meeting must have an address'
    }
  },
  yearlymeeting: String,
  branch: String, // conservative, FGC, FUM, EFCI, unaffiliated
  worshipstyle: String // programmed, unprogrammed, semi-programmed
});

module.exports = mongoose.model('Meeting', meetingSchema);
