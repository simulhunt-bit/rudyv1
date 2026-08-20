import "server-only";
import type { AIProvider } from "./provider";
import type { ChatMessage } from "@/types/chat";
import { RUDY_SYSTEM_PROMPT } from "@/lib/rudy/prompt";
import { providerFetch } from "./request";

export const openAIProvider: AIProvider = {
  id: "openai", label: "OpenAI", capabilities: { text: true, vision: true, voice: false, image: false, video: false, audio: false, research: false },
  isConfigured: () => Boolean(process.env.OPENAI_API_KEY),
  async chat(messages: ChatMessage[]) {
    const response = await providerFetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", instructions: RUDY_SYSTEM_PROMPT, input: messages.map((m) => ({ role: m.role, content: m.content })) }) });
    if (!response.ok) {
      const bodyText = await response.text().catch(() => "");
      throw new Error(`OpenAI request failed (${response.status}): ${bodyText}`);
    }
    const data = await response.json();
    return data.output_text || "The expedition got oddly quiet. Try that once more.";
  }
};
