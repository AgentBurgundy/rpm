import handleGetAdvPrompt from "../data-providers/handleGetAdvPrompt";

export default async (req: any, res: any) => {
  const { promptId } = req.params;
  const { args } = req.body;

  if (!promptId) {
    return res.status(400).json({ message: "No id, id is required" });
  }

  try {
    const prompt = await handleGetAdvPrompt(promptId, args);

    if (!prompt) {
      res.status(404).json({ message: "Prompt with that ID not found" });
    }

    res.status(200).json({ prompt });
  } catch (e) {
    console.error("error fetching prompt", e);
  }
};
