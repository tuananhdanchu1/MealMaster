// dishModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './userModel.js';

const Dish = sequelize.define('Dish', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.JSON,
  },
  nutrition: {
    type: DataTypes.JSON,
  },
  description: {
    type: DataTypes.STRING,
  },
});

// Mối quan hệ giữa User và Dish (N:M)
Dish.belongsToMany(User, { through: 'UserDishes' });

export default Dish;
