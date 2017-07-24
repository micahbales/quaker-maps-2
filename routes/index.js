const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { catchErrors } = require('../handlers/errorHandlers');

// main map
router.get('/', (req, res) => { res.redirect('/map') });
router.get('/map', meetingController.map);

// meetings
router.get('/meetings', catchErrors(meetingController.getMeetings));
router.get('/meetings/add', meetingController.addMeeting);
router.post('/meetings/add', catchErrors(meetingController.createMeeting));

module.exports = router;
