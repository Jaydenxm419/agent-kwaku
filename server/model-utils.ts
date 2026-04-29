import { api } from "../convex/_generated/api.js";
import { convex } from "./convex-client.js";

export async function getActiveModel(): Promise<string> {
  try {
    const activeModel = await convex.query(api.settings.getActiveModel);
    if (activeModel) {
      return activeModel;
    }
  } catch (err) {
    console.error("[model-utils] Failed to fetch active model from Convex", err);
  }

  // Fallback to env var or default
  return process.env.BOOP_MODEL ?? "claude-3-5-sonnet-latest";
}
