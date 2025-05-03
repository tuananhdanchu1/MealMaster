// mealPlanRoutes.js
const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');

// Tạo thực đơn bằng AI
router.post('/create', mealPlanController.createMealPlan);

// Lấy chi tiết thực đơn
router.get('/:userId', mealPlanController.getMealPlan);

module.exports = router;
