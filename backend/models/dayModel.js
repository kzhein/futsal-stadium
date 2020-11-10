const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    required: [true, 'Day is required'],
  },
  openHours: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'OpenHour',
      required: [true, 'Open hour is required'],
    },
  ],
});

daySchema.index({ day: 1 }, { unique: true });

daySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'openHours',
    select: '-__v',
  });
  next();
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
