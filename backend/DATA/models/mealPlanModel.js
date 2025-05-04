// mealPlanModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './userModel.js';

const MealPlan = sequelize.define('MealPlan', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  breakfast: {
    type: DataTypes.JSON,
  },
  lunch: {
    type: DataTypes.JSON,
  },
  dinner: {
    type: DataTypes.JSON,
  },
});

// Mối quan hệ giữa User và MealPlan (1:N)
MealPlan.belongsTo(User, { foreignKey: 'userId' });

export default MealPlan;
