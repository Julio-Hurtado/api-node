const response = {
  succes: (req, res, message, status) => {
    let statusCode = status || 200,
      statusMessage = message || "";
    res.status(statusCode).send({
      error: false,
      status: statusCode,
      body: statusMessage,
    });
  },
  error: (req, res, message, status) => {
    let statusCode = status || 500,
      statusMessage = message || "Internal server error";
    res.status(statusCode).send({
      error: true,
      status: statusCode,
      body: statusMessage,
    });
  },
};
module.exports = response;
