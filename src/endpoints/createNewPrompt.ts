import handleCreatePrompt from "../data-providers/handleCreatePrompt";

export default async (req: any, res: any) => {
  const { id, prompt } = req.body;

  if (!id || !prompt) {
    return res.status(400).json({ message: "Both id and prompt are required" });
  }

  try {
    const response = await handleCreatePrompt(id, prompt);
    if (response === "Duplicate id") {
      return res.status(409).json({ message: "Id already exists" });
    }
    res.status(200).json({ message: response });
  } catch (e) {
    console.error("error creating prompt", e);
  }
};
