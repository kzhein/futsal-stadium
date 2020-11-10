const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  time: {
    type: mongoose.Schema.ObjectId,
    ref: 'OpenHour',
    required: [true, 'Time is required'],
  },
  status: {
    type: String,
    default: 'pending',
    required: [true, 'Status is required'],
    enum: {
      values: ['pending', 'confirmed'],
      message: 'Status must be pending or confirmed',
    },
  },
});

bookingSchema.index({ date: 1, time: 1 }, { unique: true });

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v',
  }).populate({
    path: 'time',
    select: '-__v',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
