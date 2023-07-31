import initializeRedis from "../caching/redis";
import { initializeMongoDB, retrievePromptById } from "./mongoDB/mongo";

export default async function handleGetPrompt(
  id: string
): Promise<string | null> {
  const redisClient = initializeRedis();

  await initializeMongoDB();

  const prompt = await retrievePromptById(id);

  if (!prompt) {
    return null;
  }

  await redisClient.setEx(
    id,
    Number(process.env.REDIS_CACHE_TIME) ?? 3600,
    prompt
  );

  return prompt;
}
