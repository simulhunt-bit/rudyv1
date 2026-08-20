import "server-only";
import type { ChatMessage, ProviderId } from "@/types/chat";
import { openAIProvider } from "./openai";
import { geminiProvider } from "./gemini";

const providers = [openAIProvider, geminiProvider];
export async function routeChat(messages: ChatMessage[], requested: ProviderId) {
  const available = providers.filter((provider) => provider.isConfigured());
  const candidates = requested === "auto" ? available : available.filter((provider) => provider.id === requested);
  if (!candidates.length) throw new Error("No AI provider is configured yet. Visit Settings to connect one.");

  if (requested === "auto" && candidates.length > 1) {
    try {
      return await Promise.any(candidates.map(async (provider) => ({ content: await provider.chat(messages), provider: provider.id })));
    } catch (err) {
      if (err instanceof AggregateError) {
        err.errors.forEach((e, i) => console.error(`[rudy][router] provider ${candidates[i]?.id} failed:`, e));
      } else {
        console.error("[rudy][router] auto mode failed:", err);
      }
      throw new Error("That provider is taking a breather. Try again.");
    }
  }

  for (const provider of candidates) {
    try {
      return { content: await provider.chat(messages), provider: provider.id };
    } catch (err) {
      console.error(`[rudy][router] provider ${provider.id} failed:`, err);
    }
  }
  throw new Error("That provider is taking a breather. Try again.");
}
