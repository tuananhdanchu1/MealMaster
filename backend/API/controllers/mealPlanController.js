// mealPlanController.js
import * as mealPlanService from '../services/mealPlanService.js';

export const createMealPlan = async (req, res) => {
  try {
    const { userId, familyDetails } = req.body;
    const mealPlan = await mealPlanService.createMealPlan(userId, familyDetails);
    res.status(200).json(mealPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMealPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const mealPlan = await mealPlanService.getMealPlan(userId);
    res.status(200).json(mealPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
