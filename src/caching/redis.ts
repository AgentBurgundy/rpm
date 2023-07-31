import { RedisClientType, createClient } from "redis";

let redisClient: RedisClientType | null = null; // start with redisClient as null

export default function initializeRedis() {
  if (!redisClient) {
    // only if redisClient is null, initialize it
    redisClient = createClient({
      url: process.env.REDIS_CONNECTION_STRING,
    });
    redisClient.on("error", function (error: any) {
      console.error("Redis Error: ", error);
    });
  }

  return redisClient;
}
