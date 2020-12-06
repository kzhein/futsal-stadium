const OpenHour = require('../models/openHourModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllOpenHours = catchAsync(async (req, res, next) => {
  const openHours = await OpenHour.find().sort('start');

  res.status(200).json({
    status: 'success',
    data: {
      openHours,
    },
  });
});
