import mongoose from "mongoose";

const basicPromptSchema = new mongoose.Schema({
  _id: String,
  prompt: String,
});

const BasicPrompt = mongoose.model("Prompt", basicPromptSchema);
