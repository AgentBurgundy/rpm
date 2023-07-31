import mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose";

// Prompt model
interface IPrompt extends Document {
  _id: string;
  prompt: String;
}

const promptSchema = new Schema<IPrompt>({
  _id: String,
  prompt: String,
});

const Prompt: Model<IPrompt> = mongoose.model<IPrompt>("Prompt", promptSchema);

// Initialize the MongoDB connection
export const initializeMongoDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_CONNECTION_STRING)
      throw new Error("MONGO_CONNECTION_STRING is not defined");

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

// Retrieve the prompt by id
export const retrievePromptById = async (
  id: string
): Promise<string | null> => {
  try {
    const promptDoc = await Prompt.findOne({ _id: id });
    return promptDoc ? promptDoc.prompt.toString() : null;
  } catch (error) {
    console.error(`Cannot find record with id ${id}`);
    return null;
  }
};
