// mealPlanService.js
const MealPlan = require('../../DATA/models/mealPlanModel');
const Dish = require('../../DATA/models/dishModel');
const User = require('../../DATA/models/userModel');

// Tạo thực đơn bằng AI
exports.createMealPlan = async (userId, familyDetails) => {
  // Lấy thông tin người dùng
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // AI xử lý để tạo thực đơn (bạn có thể tích hợp một thuật toán AI ở đây hoặc tạo một quy trình tính toán đơn giản)
  const breakfast = await Dish.findAll({ where: { type: 'breakfast' } });  // Ví dụ lấy món ăn cho bữa sáng
  const lunch = await Dish.findAll({ where: { type: 'lunch' } });
  const dinner = await Dish.findAll({ where: { type: 'dinner' } });

  // Tạo thực đơn
  const mealPlan = await MealPlan.create({
    userId: user.id,
    breakfast: breakfast.map(dish => dish.id),
    lunch: lunch.map(dish => dish.id),
    dinner: dinner.map(dish => dish.id),
  });

  return mealPlan;
};

// Lấy chi tiết thực đơn
exports.getMealPlan = async (userId) => {
  const mealPlan = await MealPlan.findOne({ where: { userId } });
  if (!mealPlan) {
    throw new Error('Meal plan not found');
  }

  // Lấy thông tin chi tiết món ăn cho từng bữa ăn
  const breakfastDishes = await Dish.findAll({ where: { id: mealPlan.breakfast } });
  const lunchDishes = await Dish.findAll({ where: { id: mealPlan.lunch } });
  const dinnerDishes = await Dish.findAll({ where: { id: mealPlan.dinner } });

  return {
    breakfast: breakfastDishes,
    lunch: lunchDishes,
    dinner: dinnerDishes,
  };
};
