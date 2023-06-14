export const errorMiddleware = (err, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  err.message = err.message || "Internal Server Error";

  return res.status(404).json({
    success: false,
    message: err.message,
  });
};
