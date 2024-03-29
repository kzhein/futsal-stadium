const Booking = require('../models/bookingModel');
const Day = require('../models/dayModel');
const OpenHour = require('../models/openHourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const getDay = require('../utils/getDay');
const hasNotPassedTheCurrentTime = require('../utils/hasNotPassedTheCurrentTime');
const sendNotifications = require('../utils/sendNotifications');

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const bookings = await features.query;
  const allTotal = await Booking.estimatedDocumentCount();

  res.status(200).json({
    status: 'success',
    total: bookings.length,
    allTotal,
    data: {
      bookings,
    },
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const date = new Date(req.body.date);

  // check if no date
  if (!req.body.date) {
    throw new AppError('Date is required to book', 400);
  }

  // check if no section
  if (!req.body.time || req.body.time.length === 0) {
    throw new AppError('You need to choose at least one section to book', 400);
  }

  // check if old date
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (now > date) {
    throw new AppError('You are entering an old date', 400);
  }

  // check the section user trying to book is included in the day
  const dayToBook = await Day.findOne({ day: getDay(date) });

  let included = true;
  req.body.time.forEach(time => {
    if (!dayToBook.openHours.find(oh => `${oh._id}` === time)) {
      included = false;
    }
  });
  if (!included) {
    throw new AppError('Invalid section of the day', 400);
  }

  // check the section user trying to book is already passed the current time
  const hasNotPassedPromises = req.body.time.map(async time => {
    const openHour = await OpenHour.findById(time);
    return {
      openHour,
      hasNotPassed: hasNotPassedTheCurrentTime(req.body.date, openHour.start),
    };
  });
  const hasNotPassed = await Promise.all(hasNotPassedPromises);

  const passedTime = hasNotPassed.find(hnp => hnp.hasNotPassed === false);
  if (passedTime) {
    throw new AppError(
      `${passedTime.openHour.time} has already passed the current time`,
      400
    );
  }

  // check if any of the section has already been booked
  const isBookedPromises = req.body.time.map(async time => {
    const booked = await Booking.findOne({ date, time });
    return booked;
  });
  const booked = await Promise.all(isBookedPromises);
  if (booked[0]) {
    throw new AppError(`${booked[0].time.time} has already been booked.`, 400);
  }

  // create bookings
  const bookings = await Booking.insertMany(
    req.body.time.map(time => {
      return { user: req.user.id, date, time };
    })
  );

  res.status(201).json({
    status: 'success',
    total: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new AppError('No booking found with that ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookings = await Booking.find({
    user: req.user.id,
    date: { $gte: today },
  });

  res.status(200).json({
    status: 'success',
    data: {
      bookings,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    throw new AppError('No booking found with that ID', 404);
  }

  // Notify User
  sendNotifications(booking.user, {
    title: 'Success!',
    body: `${booking.user.name}, your booking has been approved! 🎉`,
  });

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    throw new AppError('No booking found with that ID', 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
