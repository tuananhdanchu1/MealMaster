// userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  familyInfo: {
    type: DataTypes.JSON,  // Lưu thông tin gia đình (tuổi, nhu cầu dinh dưỡng)
  }
});

module.exports = User;
