const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 전체 회원 조회 및 필터링
router.get('/user', reqAuth, userController.getUsers);

// 회원 강제 탈퇴
router.patch('/user/:id/ban', reqAuth, userController.banUser);

module.exports = router;
