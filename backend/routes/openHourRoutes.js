const express = require('express');
const { getAllOpenHours } = require('../controllers/openHourController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.get('/', protect, restrictTo('admin'), getAllOpenHours);

module.exports = router;
