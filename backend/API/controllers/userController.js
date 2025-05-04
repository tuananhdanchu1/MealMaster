// userController.js
import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, familyInfo } = req.body;
    const newUser = await userService.registerUser(username, email, password, familyInfo);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await userService.updateUserInfo(userId, req.body);
    res.status(200).json({ message: 'User info updated', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
