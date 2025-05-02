const express = require('express');
const router = express.Router();
const dishesController = require('../controllers/dishesController.js');

router.get('/', dishesController.getAllDishes);
router.post('/', dishesController.addDish);

module.exports = router;