const axios = require("axios");

const loggingMiddleware = async (req, res, next) => {
  try {
    const payload = {
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date().toISOString(),
    };

    const headers = {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      "Content-Type": "application/json",
    };

    await axios.post(process.env.LOGGING_API_URL, payload, { headers });
  } catch (err) {
  }

  next();
};

module.exports = loggingMiddleware;
