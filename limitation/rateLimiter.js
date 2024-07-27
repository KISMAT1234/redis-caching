const { waitForTokens } = require('./tokenBucket');

const rateLimiter = (req, res, next) => {
  const key = `rate_limit:${req.ip}`;
  const maxWaitTime = 2000; // Maximum wait time of 5 seconds
  console.log('came in ratelimiter')
  waitForTokens(key, 1, maxWaitTime) // Example: require 1 token per request
    .then((allowed) => {
      if (allowed) {
        console.log('have token ')
        next();
      } else {
        console.log('limit exceeded')
        res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
      }
    })
    .catch((err) => {
      console.error('Rate limiter error:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = rateLimiter;





