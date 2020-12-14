const Day = require('../models/dayModel');
require('../models/openHourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const getDay = require('../utils/getDay');
const Booking = require('../models/bookingModel');

exports.getAllDays = catchAsync(async (req, res, next) => {
  const days = await Day.find();

  res.status(200).json({
    status: 'success',
    data: {
      days,
    },
  });
});

exports.getDay = catchAsync(async (req, res, next) => {
  const day = await Day.findById(req.params.id);

  if (!day) {
    throw new AppError('No day found with that ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      day,
    },
  });
});

exports.getDayWithAvailable = catchAsync(async (req, res, next) => {
  const date = new Date(req.headers['x-date']);
  // console.log('date is ', req.headers);
  const day = await Day.findOne({ day: getDay(date) }).lean();

  const availableHoursPromises = day.openHours.map(async hr => {
    const isBooked = await Booking.findOne({ date, time: hr._id });

    return {
      ...hr,
      booked: Boolean(isBooked),
    };
  });
  const availableHours = await Promise.all(availableHoursPromises);

  return res.status(200).json({
    status: 'success',
    total: availableHours.length,
    data: {
      availableHours,
    },
  });
});

exports.updateDay = catchAsync(async (req, res, next) => {
  const day = await Day.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!day) {
    throw new AppError('No day found with that ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      day,
    },
  });
});
