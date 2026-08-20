import "server-only";
import type { AIProvider } from "./provider";
import type { ChatMessage } from "@/types/chat";
import { RUDY_SYSTEM_PROMPT } from "@/lib/rudy/prompt";
import { providerFetch } from "./request";

export const geminiProvider: AIProvider = {
  id: "gemini", label: "Gemini", capabilities: { text: true, vision: true, voice: false, image: false, video: false, audio: false, research: false },
  isConfigured: () => Boolean(process.env.GEMINI_API_KEY),
  async chat(messages: ChatMessage[]) {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const contents = messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
    const response = await providerFetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ systemInstruction: { parts: [{ text: RUDY_SYSTEM_PROMPT }] }, contents, generationConfig: { temperature: 0.75, maxOutputTokens: 1000 } }) });
    if (!response.ok) {
      const bodyText = await response.text().catch(() => "");
      throw new Error(`Gemini request failed (${response.status}): ${bodyText}`);
    }
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("") || "No signal from base camp. Give that another go.";
  }
};
