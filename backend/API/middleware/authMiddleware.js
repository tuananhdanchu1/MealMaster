// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Kiểm tra xác thực JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = decoded;  // Lưu thông tin người dùng đã giải mã vào req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
