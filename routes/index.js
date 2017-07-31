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
/* meeting edit */
router.get('/meetings/:id/edit', catchErrors(meetingController.editMeeting));
/* meeting update */
router.post('/meetings/:id/add', catchErrors(meetingController.updateMeeting));
/* meeting delete */
router.post('/meetings/:id/delete', catchErrors(meetingController.deleteMeeting));

module.exports = router;
