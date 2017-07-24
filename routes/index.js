const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.redirect('/map');
})
router.get('/map', meetingController.map);

router.get('/meetings/add', meetingController.addMeeting);
router.post('/meetings/add', catchErrors(meetingController.createMeeting));

module.exports = router;
