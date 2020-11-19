const express = require('express');
const {
  getMyBookings,
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.get('/getMyBookings', protect, getMyBookings);

router
  .route('/')
  .get(protect, restrictTo('admin'), getAllBookings)
  .post(protect, createBooking);

router
  .route('/:id')
  .get(protect, restrictTo('admin'), getBooking)
  .patch(protect, restrictTo('admin'), updateBooking)
  .delete(protect, restrictTo('admin'), deleteBooking);

module.exports = router;
