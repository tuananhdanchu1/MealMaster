// mealPlanModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const MealPlan = sequelize.define('MealPlan', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  breakfast: {
    type: DataTypes.JSON,  // Lưu danh sách món ăn cho bữa sáng
  },
  lunch: {
    type: DataTypes.JSON,  // Lưu danh sách món ăn cho bữa trưa
  },
  dinner: {
    type: DataTypes.JSON,  // Lưu danh sách món ăn cho bữa tối
  },
});

const User = require('./userModel');  
// Mối quan hệ giữa User và MealPlan (1:N)
MealPlan.belongsTo(User, { foreignKey: 'userId' });

module.exports = MealPlan;
