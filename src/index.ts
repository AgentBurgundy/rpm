import express from "express";
import handleGetPrompt from "./data-providers/handleGetPrompt";
import redisMiddleware from "./caching/redisMiddleware";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).send({ status: "Alive" }));

app.post("/getPrompt", redisMiddleware, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "No id, id is required" });
  }

  try {
    const prompt = await handleGetPrompt(id);

    if (!prompt) {
      res.status(404).json({ message: "Prompt with that ID not found" });
    }

    res.status(200).json({ prompt });
  } catch (e) {
    console.error("error fetching prompt", e);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
