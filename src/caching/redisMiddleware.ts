import initializeRedis from "./redis";

export default async function redisMiddleware(req: any, res: any, next: any) {
  const redisClient = initializeRedis();

  const { id } = req.body;
  const prompt = await redisClient.get(id);

  if (prompt) {
    return res.status(200).json({ prompt });
  } else {
    next();
  }
}
