const errorHandler = async (err, req, res, next) => {
  err.message = err.message || "Something went wrong";
  err.status = err.status || 500;

  return res.status(err.status).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
