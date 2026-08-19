import "server-only";
import type { ChatMessage, ProviderId } from "@/types/chat";
import { openAIProvider } from "./openai";
import { geminiProvider } from "./gemini";

const providers = [geminiProvider, openAIProvider];
export async function routeChat(messages: ChatMessage[], requested: ProviderId) {
  const available = providers.filter((provider) => provider.isConfigured());
  const candidates = requested === "auto" ? available : available.filter((provider) => provider.id === requested);
  if (!candidates.length) throw new Error("No AI provider is configured yet. Visit Settings to connect one.");

  for (const provider of candidates) {
    try {
      return { content: await provider.chat(messages), provider: provider.id };
    } catch {
      // Auto mode deliberately falls through to another configured provider.
      // Provider-specific errors stay server-side and are never shown to users.
    }
  }
  throw new Error("That provider is taking a breather. Try again.");
}
