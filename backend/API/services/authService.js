// authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../DATA/models/userModel.js';

// Đăng ký người dùng mới
export const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });

  return newUser;
};

// Đăng nhập người dùng
export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};
