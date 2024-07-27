// server/utils/tokenBucket.js
const client = require('../redis');

const RATE_LIMIT_BUCKET_KEY = 'rate_limit_bucket';

const getTokenBucket = async (key, maxTokens, refillRate) => {
  const now = Date.now();
  const lastUpdate = await client.hGet(key, 'lastUpdate') || now;
  const tokens = await client.hGet(key, 'tokens') || maxTokens;
  
  const elapsedTime = now - lastUpdate;
  const refillTokens = Math.floor(elapsedTime * refillRate / 1000);
  const newTokens = Math.min(maxTokens, parseInt(tokens) + refillTokens);
  
  await client.hSet(key, 'tokens', newTokens);
  await client.hSet(key, 'lastUpdate', now);
  
  return newTokens;
};

const waitForTokens = (key, tokensRequired, maxWaitTime) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkTokens = async () => {
      const tokens = await getTokenBucket(key, 1, 1); // Example: 10 tokens, refill rate of 1 token/second

      if (tokens >= tokensRequired) {
        await client.hSet(key, 'tokens', tokens - tokensRequired);
        resolve(true);
      } else if (Date.now() - startTime >= maxWaitTime) {
        resolve(false);
      } else {
        setTimeout(checkTokens, 100); // Check again after 100ms
      }
    };
    console.log('came at last in token bucket')

    checkTokens();
  });
};

module.exports = { waitForTokens };
