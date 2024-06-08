const { v4: uuidv4 } = require("uuid");

// Middleware to add tracking ID to each request
const trackingIdMiddleware = (req, res, next) => {
  req.trackingId = uuidv4();
  console.log(
    `Tracking ID [${req.trackingId}]: Received request ${req.method} ${req.url}`
  );
  next();
};

module.exports = trackingIdMiddleware;
