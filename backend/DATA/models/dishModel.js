// dishModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Dish = sequelize.define('Dish', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.JSON,  // Lưu thông tin nguyên liệu của món ăn
  },
  nutrition: {
    type: DataTypes.JSON,  // Thông tin dinh dưỡng (calories, protein, fat...)
  },
  description: {
    type: DataTypes.STRING,  // Mô tả món ăn
  }
});

const User = require('./userModel');  
// Mối quan hệ giữa User và Dish (N:M)
Dish.belongsToMany(User, { through: 'UserDishes' });

module.exports = Dish;
