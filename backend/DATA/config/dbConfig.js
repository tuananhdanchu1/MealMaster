// dbConfig.js
const { Sequelize } = require('sequelize');

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Tên cơ sở dữ liệu
  process.env.DB_USER,     // Tên người dùng cơ sở dữ liệu
  process.env.DB_PASSWORD, // Mật khẩu người dùng
  {
    host: process.env.DB_HOST,      // Địa chỉ host của cơ sở dữ liệu
    dialect: 'mysql',               // Loại cơ sở dữ liệu (có thể là 'mysql', 'postgres', v.v.)
    logging: false,                 // Tắt logging SQL
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = sequelize;
