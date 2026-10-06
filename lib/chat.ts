import { v4 as uuid } from 'uuid';

export const CHAT_KEY = 'jeevan-u-gowda:chat:v1';
export const CHAT_EVENT = 'jeevan-chat-reset';
export const MAX_MESSAGES = 40;
export const MAX_CONTENT = 8000;
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
export interface Conversation {
  version: 1;
  conversationId: string;
  messages: ChatMessage[];
  updatedAt: number;
}
export function newConversation(): Conversation {
  return {
    version: 1,
    conversationId: uuid(),
    messages: [],
    updatedAt: Date.now(),
  };
}
export function validMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length <= MAX_MESSAGES &&
    value.every(
      m =>
        m &&
        typeof m.id === 'string' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0 &&
        m.content.length <= MAX_CONTENT
    ) &&
    new Set(value.map(m => m.id)).size === value.length
  );
}
export function readConversation(): Conversation {
  try {
    const raw = localStorage.getItem(CHAT_KEY);
    if (raw && raw.length < 400000) {
      const data = JSON.parse(raw);
      if (
        data.version === 1 &&
        typeof data.conversationId === 'string' &&
        /^[0-9a-f-]{36}$/i.test(data.conversationId) &&
        validMessages(data.messages) &&
        typeof data.updatedAt === 'number' &&
        data.updatedAt <= Date.now() &&
        Date.now() - data.updatedAt < 30 * 86400000
      )
        return data;
    }
  } catch {
    /* Unavailable or corrupt storage: keep this chat in memory. */
  }
  return newConversation();
}
export function saveConversation(data: Conversation): boolean {
  try {
    localStorage.setItem(CHAT_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
export function resetChat() {
  window.dispatchEvent(new Event(CHAT_EVENT));
}
