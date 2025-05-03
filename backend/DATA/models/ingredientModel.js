// ingredientModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Ingredient = sequelize.define('Ingredient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Đảm bảo nguyên liệu không bị trùng lặp
  },
  calories: {
    type: DataTypes.INTEGER,  // Lượng calories trong nguyên liệu
    allowNull: false,
  },
  protein: {
    type: DataTypes.INTEGER,  // Lượng protein trong nguyên liệu
    allowNull: false,
  },
  fat: {
    type: DataTypes.INTEGER,  // Lượng chất béo trong nguyên liệu
    allowNull: false,
  },
  carbohydrates: {
    type: DataTypes.INTEGER,  // Lượng carbohydrate trong nguyên liệu
    allowNull: false,
  },
  servingSize: {
    type: DataTypes.STRING,  // Kích thước khẩu phần
    allowNull: false,
  }
});

const User = require('./userModel');  
// Mối quan hệ giữa Ingredient và Dish (1:N)
Ingredient.hasMany(Dish, { foreignKey: 'ingredientId' });

module.exports = Ingredient;
