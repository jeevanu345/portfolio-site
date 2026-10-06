import { useRouter } from 'next/router';
import { Bot } from 'lucide-react';
import { Button } from './ui/button';

export default function AskSequoiaButton({
  currentLink,
}: {
  currentLink: string;
}) {
  const router = useRouter();
  if (currentLink === 'sequoia') return null;
  return (
    <div className="flex flex-col items-center">
      <Button
        aria-label="Ask Jeevan AI"
        title="Ask Jeevan AI"
        variant="outline"
        size="icon"
        className="w-10 h-10 rounded-full border-border bg-background"
        onClick={() => router.push('/sequoia')}
      >
        <Bot size={22} />
      </Button>
      <span className="mt-2 text-sm text-foreground">Jeevan AI</span>
    </div>
  );
}
