// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConfig = require('./DATA/config/dbConfig');
const errorMiddleware = require('./API/middleware/errorMiddleware');
const authRoutes = require('./API/routes/authRoutes');
const userRoutes = require('./API/routes/userRoutes');
const dishRoutes = require('./API/routes/dishRoutes');
const mealPlanRoutes = require('./API/routes/mealPlanRoutes');

// Đọc cấu hình từ .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Cho phép các yêu cầu từ các domain khác
app.use(express.json());  // Giải mã dữ liệu JSON trong body của yêu cầu

// Kết nối cơ sở dữ liệu
dbConfig.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/mealPlans', mealPlanRoutes);

// Middleware xử lý lỗi
app.use(errorMiddleware);

// Khởi tạo server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
