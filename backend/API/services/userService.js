// userService.js
const bcrypt = require('bcrypt');
const User = require('../../DATA/models/userModel');

// Đăng ký người dùng mới
exports.registerUser = async (username, email, password, familyInfo) => {
  // Kiểm tra xem người dùng đã tồn tại chưa
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo người dùng mới
  const newUser = await User.create({ username, email, password: hashedPassword, familyInfo });
  return newUser;
};

// Lấy thông tin người dùng
exports.getUserInfo = async (userId) => {
  const user = await User.findByPk(userId);  // Lấy thông tin người dùng theo ID
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Cập nhật thông tin người dùng
exports.updateUserInfo = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (updateData.email) {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email: updateData.email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
  }

  // Cập nhật thông tin người dùng
  await user.update(updateData);
  return user;
};
