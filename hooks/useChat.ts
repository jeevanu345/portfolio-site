import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  CHAT_EVENT,
  ChatMessage,
  Conversation,
  MAX_CONTENT,
  MAX_MESSAGES,
  newConversation,
  readConversation,
  saveConversation,
} from '../lib/chat';

export function useChat() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const current = useRef<Conversation | null>(null);
  const request = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [persistent, setPersistent] = useState(true);
  const update = (data: Conversation) => {
    current.current = data;
    setConversation(data);
    setPersistent(saveConversation(data));
  };
  const clear = () => {
    request.current?.abort();
    request.current = null;
    setLoading(false);
    setError('');
    update(newConversation());
  };
  useEffect(() => {
    update(readConversation());
    // Retire the unversioned template history; never import another identity's chat.
    try {
      localStorage.removeItem('sequoia-history');
      localStorage.removeItem('session-id-sequoia');
    } catch {}
    window.addEventListener(CHAT_EVENT, clear);
    return () => {
      window.removeEventListener(CHAT_EVENT, clear);
      request.current?.abort();
    };
  }, []);
  const send = async (text: string, retry = false) => {
    const data = current.current;
    const content = text.trim();
    if (
      !data ||
      request.current ||
      (!retry && (!content || content.length > MAX_CONTENT))
    )
      return;
    let messages: ChatMessage[] = data.messages;
    if (retry) {
      if (messages[messages.length - 1]?.role !== 'user') return;
    } else {
      messages = [
        ...messages,
        { id: uuid(), role: 'user' as const, content },
      ].slice(-MAX_MESSAGES);
    }
    const next = { ...data, messages, updatedAt: Date.now() };
    update(next);
    setError('');
    setLoading(true);
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: messages.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      const answer = result?.choices?.[0]?.message?.content;
      if (
        typeof answer !== 'string' ||
        !answer.trim() ||
        answer.length > MAX_CONTENT
      )
        throw new Error('Invalid response');
      if (request.current !== controller) return;
      update({
        ...next,
        messages: [
          ...messages,
          { id: uuid(), role: 'assistant', content: answer } as ChatMessage,
        ].slice(-MAX_MESSAGES),
        updatedAt: Date.now(),
      });
    } catch {
      if (request.current === controller)
        setError('Could not get a response. Please retry in a moment.');
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) {
        request.current = null;
        setLoading(false);
      }
    }
  };
  return {
    messages: conversation?.messages || [],
    ready: !!conversation,
    loading,
    error,
    persistent,
    send,
    clear,
  };
}
