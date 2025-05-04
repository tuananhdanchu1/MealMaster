// authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Đăng ký người dùng
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
