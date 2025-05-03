// dishRoutes.js
const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

// Lấy danh sách món ăn
router.get('/', dishController.getAllDishes);

// Lấy chi tiết món ăn
router.get('/:id', dishController.getDishDetails);

// Lưu món ăn yêu thích
router.post('/favorite', dishController.saveFavoriteDish);

module.exports = router;
