// authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../DATA/models/userModel.js');

// Đăng ký người dùng mới
exports.registerUser = async (username, email, password) => {
  // Kiểm tra xem người dùng đã tồn tại chưa
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo người dùng mới
  const newUser = await User.create({ username, email, password: hashedPassword });
  return newUser;
};

// Đăng nhập người dùng
exports.loginUser = async (email, password) => {
  // Kiểm tra xem người dùng có tồn tại không
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Tạo JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};
