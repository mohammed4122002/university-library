import { Redis } from "@upstash/redis"
import config from '@/lib/config';
// 👇 we can now import our redis client anywhere we need it
export const redis = new Redis({
  url: config.env.upstash.redisUrl,
  token: config.env.upstash.redisToken,
})