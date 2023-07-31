import { AdvancedProp } from "../types/AdvancedProp";
import { initializeMongoDB, retrievePromptById } from "./mongoDB/mongo";

export default async function handleGetAdvPrompt(
  id: string,
  args: AdvancedProp[]
): Promise<string | null> {
  await initializeMongoDB();

  const prompt = await retrievePromptById(id);

  if (!prompt) {
    return null;
  }

  if (args.length > 0) {
    args.forEach(async (arg) => {
      prompt.replaceAll(`<${arg.key}>`, arg.value);
    });
  }

  return prompt;
}
