import { useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import ChatPanel from './ChatPanel';

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [visited, setVisited] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  if (router.pathname === '/sequoia') return null;
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {visited && (
        <div
          hidden={!open}
          id="jeevan-chat-widget"
          className="w-[calc(100vw-2rem)] sm:w-96 h-[540px] max-h-[80dvh] mb-4 border border-border rounded-xl shadow-2xl overflow-hidden"
        >
          <ChatPanel
            onClose={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
          />
        </div>
      )}
      <button
        ref={trigger}
        type="button"
        aria-label={open ? 'Minimize Jeevan AI' : 'Open Jeevan AI'}
        aria-expanded={open}
        aria-controls="jeevan-chat-widget"
        onClick={() => {
          setVisited(true);
          setOpen(!open);
        }}
        className="bg-primary text-primary-foreground p-4 rounded-full shadow-xl focus-visible:ring-2 focus-visible:ring-primary"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
