import type { ChatMessage, ProviderId } from "@/types/chat";
export interface AIProvider { id: Exclude<ProviderId, "auto">; label: string; capabilities: { text: boolean; vision: boolean; voice: boolean; image: boolean; video: boolean; audio: boolean; research: boolean }; isConfigured(): boolean; chat(messages: ChatMessage[]): Promise<string>; }
