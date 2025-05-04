// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

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

  return res.status(500).json({
    message: 'Something went wrong',
    details: err.message,
  });
};

export default errorMiddleware;
