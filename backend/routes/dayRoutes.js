const express = require('express');
const {
  getDayWithAvailable,
  getAllDays,
  getDay,
  updateDay,
} = require('../controllers/dayController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.get('/available', getDayWithAvailable);

router.route('/').get(protect, restrictTo('admin'), getAllDays);
router
  .route('/:id')
  .get(protect, restrictTo('admin'), getDay)
  .patch(protect, restrictTo('admin'), updateDay);

module.exports = router;
