const OpenHour = require('../models/openHourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const getDay = require('../utils/getDay');

exports.getAllOpenHours = catchAsync(async (req, res, next) => {
  const openHours = await OpenHour.find();

  res.status(200).json({
    status: 'success',
    data: {
      openHours,
    },
  });
});
