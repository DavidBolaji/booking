const responseHandler = (res, status, data = [], id) => {
  res.status(status).json({
    status: "success",
    data: data,
    id,
  });
};

module.exports = responseHandler;
