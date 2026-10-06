import ChatPanel from '../../components/ChatPanel';

export default function ChatPage() {
  return (
    <div
      className="flex flex-col h-[calc(100vh-120px)]"
      style={{ height: 'calc(100dvh - 120px)' }}
    >
      <ChatPanel />
    </div>
  );
}
