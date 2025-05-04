// dishRoutes.js
import express from 'express';
import * as dishController from '../controllers/dishController.js';

const router = express.Router();

router.get('/', dishController.getAllDishes);

// Lấy chi tiết món ăn
router.get('/:id', dishController.getDishDetails);
router.post('/favorite', dishController.saveFavoriteDish);

export default router;
