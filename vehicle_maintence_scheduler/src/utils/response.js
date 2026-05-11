const sendSuccess = (res, data, message, statusCode = 200) => {
  res.status(statusCode).json({
    message,
    data,
  });
};

const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    message,
    error: message,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
