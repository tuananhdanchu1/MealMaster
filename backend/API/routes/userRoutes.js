// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng ký người dùng mới
router.post('/register', userController.registerUser);

// Lấy thông tin người dùng
router.get('/:userId', userController.getUserInfo);

// Cập nhật thông tin người dùng
router.put('/:userId', userController.updateUserInfo);

module.exports = router;
