const mongoose = require('mongoose');

const openHourSchema = new mongoose.Schema({
  time: {
    type: String,
    required: [true, 'Must have time'],
  },
  start: {
    type: Number,
    required: [true, 'Must have start time'],
  },
  end: {
    type: Number,
    required: [true, 'Must have end time'],
  },
});

const OpenHour = mongoose.model('OpenHour', openHourSchema);

module.exports = OpenHour;
