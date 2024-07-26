const client = require('../redis.js');

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

const useTokens = async (key, tokensRequired) => {
  const tokens = await getTokenBucket(key, 10, 1); // Example: 10 tokens, refill rate of 1 token/second
  
  if (tokens < tokensRequired) {
    return false;
  }
  
  await client.hSet(key, 'tokens', tokens - tokensRequired);
  return true;
};

module.exports = { useTokens };