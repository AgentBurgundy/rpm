import { RedisClientType, createClient } from "redis";

let redisClient: RedisClientType | null = null; // start with redisClient as null

export default function initializeRedis() {
  if (!redisClient) {
    if (
      !process.env.REDIS_HOST ||
      !process.env.REDIS_PORT ||
      !process.env.REDIS_PASSWORD
    ) {
      throw new Error(
        "Redis env vars are not setup properly. Need a Host, Port, and Password"
      );
    }

    // If client does not exist...
    redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) ?? 6379,
      },
    });

    redisClient.on("error", function (error: any) {
      console.error("Redis Error: ", error);
    });
  }

  return redisClient; // Return the client
}
