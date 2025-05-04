// dishController.js
import * as dishService from '../services/dishService.js';

export const getAllDishes = async (req, res) => {
  try {
    const dishes = await dishService.getAllDishes();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDishDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await dishService.getDishDetails(id);
    res.status(200).json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const saveFavoriteDish = async (req, res) => {
  try {
    const { userId, dishId } = req.body;
    const favoriteDish = await dishService.saveFavoriteDish(userId, dishId);
    res.status(201).json(favoriteDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
