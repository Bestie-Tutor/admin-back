const express = require('express');
const sessionController = require('../controllers/sessionController');
const reqAuth = require('../config/safeRoutes').reqAuth;

const router = express.Router();

router.post('/checkSession', reqAuth, sessionController.checkSession);
router.post('/logout', reqAuth, sessionController.logoutUser);

module.exports = router;
