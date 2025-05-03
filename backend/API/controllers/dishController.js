// dishController.js
const dishService = require('../services/dishService');

// Lấy danh sách món ăn
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await dishService.getAllDishes();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy chi tiết món ăn
exports.getDishDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await dishService.getDishDetails(id);
    res.status(200).json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lưu món ăn yêu thích
exports.saveFavoriteDish = async (req, res) => {
  try {
    const { userId, dishId } = req.body;
    const favoriteDish = await dishService.saveFavoriteDish(userId, dishId);
    res.status(201).json(favoriteDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
