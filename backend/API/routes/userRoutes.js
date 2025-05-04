// userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.get('/:userId', userController.getUserInfo);
router.put('/:userId', userController.updateUserInfo);

export default router;
