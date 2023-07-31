import { initializeMongoDB, savePrompt } from "./mongoDB/mongo";

export default async function handleCreatePrompt(
  id: string,
  prompt: string
): Promise<string> {
  try {
    await initializeMongoDB();
    const response = await savePrompt(id, prompt);
    return response;
  } catch (error) {
    console.error("error creating prompt", error);
    return "Error creating prompt";
  }
}
