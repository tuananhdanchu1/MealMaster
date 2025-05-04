// userService.js
import bcrypt from 'bcrypt';
import User from '../../DATA/models/userModel.js';

export const registerUser = async (username, email, password, familyInfo) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword, familyInfo });

  return newUser;
};

export const getUserInfo = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  return user;
};

export const updateUserInfo = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  if (updateData.email) {
    const existingUser = await User.findOne({ where: { email: updateData.email } });
    if (existingUser) throw new Error('Email already in use');
  }

  await user.update(updateData);
  return user;
};
