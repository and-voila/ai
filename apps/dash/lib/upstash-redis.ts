import { Redis } from '@upstash/redis';

const redisClient = new Redis({
  url: 'https://resolved-fly-38211.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redisClient;
