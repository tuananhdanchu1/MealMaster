// mealPlanService.js
import MealPlan from '../../DATA/models/mealPlanModel.js';
import Dish from '../../DATA/models/dishModel.js';
import User from '../../DATA/models/userModel.js';

export const createMealPlan = async (userId, familyDetails) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const breakfast = await Dish.findAll({ where: { type: 'breakfast' } });
  const lunch = await Dish.findAll({ where: { type: 'lunch' } });
  const dinner = await Dish.findAll({ where: { type: 'dinner' } });

  const mealPlan = await MealPlan.create({
    userId: user.id,
    breakfast: breakfast.map(d => d.id),
    lunch: lunch.map(d => d.id),
    dinner: dinner.map(d => d.id),
  });

  return mealPlan;
};

export const getMealPlan = async (userId) => {
  const mealPlan = await MealPlan.findOne({ where: { userId } });
  if (!mealPlan) throw new Error('Meal plan not found');

  const breakfast = await Dish.findAll({ where: { id: mealPlan.breakfast } });
  const lunch = await Dish.findAll({ where: { id: mealPlan.lunch } });
  const dinner = await Dish.findAll({ where: { id: mealPlan.dinner } });

  return { breakfast, lunch, dinner };
};
