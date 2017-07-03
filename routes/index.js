const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.get('/', meetingController.map);
router.get('/meetings/add', meetingController.addMeeting)

router.get('/test', (req, res) => {
  res.json({ 'json': 'response' });
});

module.exports = router;
