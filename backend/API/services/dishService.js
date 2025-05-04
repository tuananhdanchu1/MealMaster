// dishService.js
import Dish from '../../DATA/models/dishModel.js';
import User from '../../DATA/models/userModel.js';

export const getAllDishes = async () => {
  return await Dish.findAll();
};

export const getDishDetails = async (id) => {
  const dish = await Dish.findByPk(id);
  if (!dish) throw new Error('Dish not found');
  return dish;
};

export const saveFavoriteDish = async (userId, dishId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const dish = await Dish.findByPk(dishId);
  if (!dish) throw new Error('Dish not found');

  await user.addDish(dish);  // Assumes User-Dish N:M relation
  return { message: 'Dish added to favorites' };
};
