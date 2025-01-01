const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const reqAuth = require('../config/safeRoutes').reqAuth;

const router = express.Router();

router.post('/:inquiryId/reply', reqAuth, inquiryController.createReply);

module.exports = router;
