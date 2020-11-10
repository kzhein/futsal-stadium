const express = require('express');
const dayController = require('../controllers/dayController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/available', dayController.getDayWithAvailable);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').get(dayController.getAllDays);
router.route('/:id').get(dayController.getDay).patch(dayController.updateDay);

module.exports = router;
