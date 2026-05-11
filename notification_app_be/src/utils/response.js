const sendSuccess = (res, data, message, statusCode = 200) => {
  res.status(statusCode).json({
    message,
    data,
  });
};

module.exports = {
  sendSuccess,
};
