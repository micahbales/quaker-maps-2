const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.get('/', meetingController.map);

router.get('/meetings/add', meetingController.addMeeting);
router.post('/meetings/add', meetingController.createMeeting);

module.exports = router;
