// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Ghi log lỗi vào console
  
    // Kiểm tra loại lỗi và trả về thông báo phù hợp
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        details: err.errors,
      });
    }
  
    if (err.name === 'SequelizeDatabaseError') {
      return res.status(500).json({
        message: 'Database error',
        details: err.message,
      });
    }
  
    // Các lỗi khác
    return res.status(500).json({
      message: 'Something went wrong',
      details: err.message,
    });
  };
  
  module.exports = errorMiddleware;
  