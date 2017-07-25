const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { catchErrors } = require('../handlers/errorHandlers');

/* redirect index to /map */
router.get('/', (req, res) => { res.redirect('/map') });
/* main map */
router.get('/map', meetingController.map);

/* meetings index page */
router.get('/meetings', catchErrors(meetingController.getMeetings));
/* meeting show page */
router.get('/meetings/:slug', catchErrors(meetingController.getMeetingBySlug));
/* meeting create page - view */
router.get('/meetings/add', meetingController.addMeeting);
/* meeting create page - action */
router.post('/meetings/add', catchErrors(meetingController.createMeeting));

module.exports = router;
