const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(
      Object.entries(err.errors || {}).map(([key, value]) => [key, value.message])
    );

    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid format for field: ${err.path}`,
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
};

module.exports = errorHandler;
