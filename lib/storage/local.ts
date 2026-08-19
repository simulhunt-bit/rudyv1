import type { Conversation } from "@/types/chat";
const KEY = "rudy-conversations-v1";
export const localConversationStore = {
  get: (): Conversation[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } },
  save: (items: Conversation[]) => localStorage.setItem(KEY, JSON.stringify(items)),
  clear: () => localStorage.removeItem(KEY),
};
