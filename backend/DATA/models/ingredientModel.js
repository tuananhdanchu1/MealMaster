// ingredientModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Dish from './dishModel.js';

const Ingredient = sequelize.define('Ingredient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  protein: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  carbohydrates: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servingSize: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Giả sử mỗi dish có một nguyên liệu chính (1:N)
Ingredient.hasMany(Dish, { foreignKey: 'ingredientId' });

export default Ingredient;
