const express = require('express');
const noticeController = require('../controllers/noticeController');
const reqAuth = require('../config/safeRoutes').reqAuth;

const router = express.Router();

router.get('/', reqAuth, noticeController.getNotices);
router.get('/:noticeId', reqAuth, noticeController.getNotice);
router.post('/', reqAuth, noticeController.createNotice);
router.put('/:noticeId', reqAuth, noticeController.updateNotice);
router.delete('/:noticeId', reqAuth, noticeController.deleteNotice);

module.exports = router;
