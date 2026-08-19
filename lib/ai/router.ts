import "server-only";
import type { ChatMessage, ProviderId } from "@/types/chat";
import { openAIProvider } from "./openai";
import { geminiProvider } from "./gemini";

const providers = [geminiProvider, openAIProvider];
export async function routeChat(messages: ChatMessage[], requested: ProviderId) {
  const available = providers.filter((provider) => provider.isConfigured());
  const provider = requested === "auto" ? available[0] : available.find((candidate) => candidate.id === requested);
  if (!provider) throw new Error("No AI provider is configured yet. Visit Settings to connect one.");
  return { content: await provider.chat(messages), provider: provider.id };
}
