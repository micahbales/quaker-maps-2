const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;
const slug = require('slugs');

const meetingSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Your meeting must have a name'
  },
  description: String,
  slug: String,
  city: String,
  state: String,
  zip: String,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates'
    }],
    address: {
      type: String,
      required: 'Your meeting must have an address'
    }
  },
  email: String,
  website: String,
  yearlymeeting: [String],
  branch: [String],
  worshipstyle: [String],
  accessibility: [String],
  created: {
    type: Date,
    default: Date.now
  },
  icon: String
});

meetingSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other meetings that have a slug of slug, slug-1, slug-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const meetingsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (meetingsWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
});

meetingSchema.pre('save', function(next) {
  // set icon according to yearly meeting
  console.log(`icon: ${this.icon}`);
  this.icon = 'blah!';
  next();
});

module.exports = mongoose.model('Meeting', meetingSchema);
