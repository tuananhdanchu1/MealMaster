// dishService.js
const Dish = require('../../DATA/models/dishModel');
const User = require('../../DATA/models/userModel');

// Lấy danh sách món ăn
exports.getAllDishes = async () => {
  return await Dish.findAll();  // Lấy tất cả các món ăn từ cơ sở dữ liệu
};

// Lấy chi tiết món ăn
exports.getDishDetails = async (id) => {
  const dish = await Dish.findByPk(id);  // Lấy món ăn theo ID
  if (!dish) {
    throw new Error('Dish not found');
  }
  return dish;
};

// Lưu món ăn yêu thích
exports.saveFavoriteDish = async (userId, dishId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const dish = await Dish.findByPk(dishId);
  if (!dish) {
    throw new Error('Dish not found');
  }

  // Lưu món ăn yêu thích cho người dùng
  await user.addDish(dish);  // Giả sử có quan hệ N:M giữa User và Dish
  return { message: 'Dish added to favorites' };
};
