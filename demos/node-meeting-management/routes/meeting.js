var express = require('express');
var router = express.Router();
const MeetingController = require('../controllers/meeting-controller')

router.post('/create', MeetingController.createMeeting);

module.exports = router;
