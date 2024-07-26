// server/middlewares/rateLimiter.js
const { useTokens } = require('./tokenBucket');

const rateLimiter = (req, res, next) => {
  const key = `rate_limit:${req.ip}`;
  
  useTokens(key, 1) // Example: require 1 token per request
    .then((allowed) => {
      if (allowed) {
        next();
      } else {
        res.status(429).json({ message: 'Rate limit exceeded' });
      }
    })
    .catch((err) => {
      console.error('Rate limiter error:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = rateLimiter;




