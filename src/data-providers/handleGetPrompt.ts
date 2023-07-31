import initializeRedis from "../caching/redis";

export default async function handleGetPrompt(id: string) {
  const redisClient = initializeRedis();

  await redisClient.setEx(
    id,
    Number(process.env.REDIS_CACHE_TIME) ?? 3600,
    "test prompt"
  );

  return "test prompt";
}
