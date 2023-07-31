import initializeRedis from "./redis";

export default async function redisMiddleware(req: any, res: any, next: any) {
  const redisClient = await initializeRedis();

  const { promptId } = req.params;
  const prompt = await redisClient.get(promptId.toString());

  if (prompt) {
    return res.status(200).json({ prompt });
  } else {
    next();
  }
}
