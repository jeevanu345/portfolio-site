import { useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { MAX_CONTENT } from '../lib/chat';

export default function ChatPanel({ onClose }: { onClose?: () => void }) {
  const { messages, ready, loading, error, persistent, send, clear } =
    useChat();
  const [input, setInput] = useState('');
  const scroller = useRef<HTMLDivElement>(null);
  const follow = useRef(true);
  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (follow.current && scroller.current)
      scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [messages, loading, error]);
  useEffect(() => {
    textarea.current?.focus();
  }, []);
  const submit = () => {
    if (!ready || loading || !input.trim()) return;
    follow.current = true;
    void send(input);
    setInput('');
  };
  return (
    <section
      aria-label="Jeevan AI chat"
      className="flex flex-col h-full min-h-0 bg-background text-foreground"
    >
      <header className="border-b border-border p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Bot aria-hidden="true" size={24} />
          <div>
            <h1 className="font-semibold">Jeevan AI</h1>
            <p className="text-xs text-muted-foreground">
              Jeevan U Gowda’s portfolio assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              clear();
              setInput('');
              follow.current = true;
              textarea.current?.focus();
            }}
            className="text-xs rounded px-2 py-2 border border-border focus-visible:ring-2 focus-visible:ring-primary"
          >
            New chat
          </button>
          {onClose && (
            <button
              type="button"
              aria-label="Close chat"
              onClick={onClose}
              className="p-2 rounded focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </header>
      <div
        ref={scroller}
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        aria-busy={loading}
        onScroll={() => {
          const el = scroller.current;
          if (el)
            follow.current =
              el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4"
      >
        {!messages.length && (
          <div className="text-center py-8 space-y-4">
            <Bot className="mx-auto text-primary" size={32} />
            <h2 className="text-xl">Ask Jeevan AI</h2>
            <p className="text-sm text-muted-foreground">
              Ask about Jeevan’s projects, skills, or education.
            </p>
            {[
              'What projects has Jeevan built?',
              'What are Jeevan’s skills?',
              'What is Jeevan’s education?',
            ].map(q => (
              <button
                type="button"
                key={q}
                disabled={!ready || loading}
                onClick={() => {
                  follow.current = true;
                  void send(q);
                }}
                className="block mx-auto text-sm border border-border rounded-lg p-2 hover:bg-muted disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <Bot aria-label="Jeevan AI" className="shrink-0 mt-2" size={20} />
            )}
            <div
              className={`min-w-0 max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap break-words ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted text-foreground rounded-bl-md'}`}
            >
              <span className="sr-only">
                {message.role === 'user' ? 'You: ' : 'Jeevan AI: '}
              </span>
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <p
            role="status"
            className="text-sm text-muted-foreground animate-pulse"
          >
            Jeevan AI is thinking…
          </p>
        )}
        {error && (
          <div role="alert" className="text-sm">
            <p>{error}</p>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                follow.current = true;
                void send('', true);
              }}
              className="underline py-2"
            >
              Retry response
            </button>
          </div>
        )}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
        className="border-t border-border p-3 space-y-2"
      >
        <p className="text-xs text-muted-foreground">
          {persistent
            ? 'History stays in this browser for up to 30 days. Shared device? Start a new chat when finished.'
            : 'Browser storage unavailable. History lasts until you leave this chat.'}
        </p>
        <div className="flex items-end gap-2">
          <textarea
            ref={textarea}
            aria-label="Message Jeevan AI"
            rows={2}
            maxLength={MAX_CONTENT}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape' && onClose) onClose();
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask about Jeevan…"
            className="flex-1 min-w-0 max-h-40 resize-y bg-muted border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!ready || loading || !input.trim()}
            className="bg-primary text-primary-foreground p-3 rounded-full disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
