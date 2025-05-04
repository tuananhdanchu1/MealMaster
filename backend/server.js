import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './DATA/config/dbConfig.js';
import errorMiddleware from './API/middleware/errorMiddleware.js';
import authRoutes from './API/routes/authRoutes.js';
import userRoutes from './API/routes/userRoutes.js';
import dishRoutes from './API/routes/dishRoutes.js';
import mealPlanRoutes from './API/routes/mealPlanRoutes.js';

// Đọc biến môi trường
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/mealPlans', mealPlanRoutes);

// Middleware xử lý lỗi
app.use(errorMiddleware);

// Tách phần khởi động server ra thành hàm async
const startServer = async () => {
  try {

    console.log('Database config:', {
      host: process.env.DB_HOST,
      instance: process.env.DB_INSTANCE
    });

    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err.message);
  }
};

// Gọi hàm khởi động
startServer();
