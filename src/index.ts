import express from "express";
import redisMiddleware from "./caching/redisMiddleware";
import getPrompt from "./endpoints/getPrompt";
import getAdvPrompt from "./endpoints/getAdvPrompt";
import createNewPrompt from "./endpoints/createNewPrompt";
import RateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

const app = express();

const limiter = RateLimit({
  windowMs: Number(process.env.RATE_LIMIT_MINUTES) ?? 1 * 60 * 1000, // 1 minute
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) ?? 100, // 100 requests
});

app.use(express.json());
app.use(limiter);

app.get("/", (req, res) => res.status(200).send({ status: "Alive" }));

app.get("/prompt/:promptId", redisMiddleware, getPrompt);
app.get("/adv-prompt/:promptId", getAdvPrompt);
app.post("/prompt", createNewPrompt);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ______  ______  _______ 
  |   __ \|   __ \|   |   |
  |      <|    __/|       |
  |___|__||___|   |__|_|__|
                             

RPM - Remote Prompt Manager is now running!
Buckle up and get ready to race on port ${PORT}!

`);
});
