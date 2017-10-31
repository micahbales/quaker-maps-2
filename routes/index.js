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

/** API **/

/* return all meeting records */
router.get('/api/v1/allmeetings', catchErrors(meetingController.mapAllMeetings));
/* return a single meeting record */
router.get('/api/v1/singlemeeting/:slug', catchErrors(meetingController.mapOneMeeting));
/* return specific meeting records according to :slug criteria & query value */
router.get('api/v1/searchmeetings/:slug', catchErrors(meetingController.searchMeetings));

module.exports = router;
