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
    handleGetPrompt(id);
  } catch (e) {
    console.error("error fetching prompt", e);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
