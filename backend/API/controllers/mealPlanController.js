// mealPlanController.js
const mealPlanService = require('../services/mealPlanService');

// Tạo thực đơn bằng AI
exports.createMealPlan = async (req, res) => {
  try {
    const { userId, familyDetails } = req.body;  // userId và thông tin gia đình từ client
    const mealPlan = await mealPlanService.createMealPlan(userId, familyDetails);
    res.status(200).json(mealPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy chi tiết thực đơn
exports.getMealPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const mealPlan = await mealPlanService.getMealPlan(userId);
    res.status(200).json(mealPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
