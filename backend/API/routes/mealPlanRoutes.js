// mealPlanRoutes.js
import express from 'express';
import * as mealPlanController from '../controllers/mealPlanController.js';

const router = express.Router();

router.post('/create', mealPlanController.createMealPlan);
router.get('/:userId', mealPlanController.getMealPlan);

export default router;
