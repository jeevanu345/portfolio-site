import Avatar from './Avatar';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { cn } from '@/lib/utils';

export default function AskSequoiaButton({
  currentLink,
}: {
  currentLink: string;
}) {
  const clientRouter = useRouter();

  const deleteChatSession = async () => {
    const sessionId = localStorage.getItem('session-id-sequoia') || '';
    const res = await fetch(`/api/deleteSequoiaSession?sessionId=${sessionId}`);
    return res.status === 200;
  };

  const handleClearSequoiaHistory = async () => {
    ReactGA.event({
      category: 'Button.Click',
      action: 'Delete Sequoia Session Button',
    });
    localStorage.setItem('sequoia-history', '[]');

    // Dispatch custom event for SEQUOIA page to listen to BEFORE the API call
    if (currentLink === 'sequoia') {
      window.dispatchEvent(new CustomEvent('clearSequoiaHistory'));
    } else {
      clientRouter.reload();
    }

    // Try to delete the chat session, but don't let it block the UI update
    try {
      await deleteChatSession();
    } catch (error) {
      console.error('Error in deleteChatSession:', error);
    }
  };

  if (currentLink === 'sequoia') {
    return (
      <TooltipProvider>
        <div className="hidden md:flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                id="clear-sequoia-history-button"
                data-cursor="true"
                onClick={handleClearSequoiaHistory}
                variant="outline"
                size="icon"
                className={cn(
                  'w-10 h-10 rounded-full border-border bg-background',
                  'opacity-60 hover:opacity-100 transition-all duration-300',
                  'text-foreground hover:text-white'
                )}
              >
                <div
                  data-cursor="clear-sequoia-history-button"
                  className="w-6 h-6 flex items-center justify-center"
                  style={{
                    maskImage: `url(/images/delete.svg)`,
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    maskSize: 'contain',
                    backgroundColor: 'currentColor',
                  }}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Clear Sequoia History</p>
            </TooltipContent>
          </Tooltip>
          <Badge
            variant="outline"
            className="mt-2 text-sm border-0 bg-transparent"
          >
            Clear
          </Badge>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              id="ask-sequoia-button"
              data-cursor="true"
              onClick={() => {
                ReactGA.event({
                  category: 'Button.Click',
                  action: 'Ask Sequoia Page Button',
                });
                clientRouter.push('/sequoia');
              }}
              variant="outline"
              size="icon"
              className={cn(
                'w-10 h-10 rounded-full border border-border bg-background hover:border-primary',
                'group transition-colors duration-300',
                'shadow-xs text-foreground hover:text-white'
              )}
            >
              <div
                data-cursor="ask-sequoia-button"
                className="w-full h-full flex items-center justify-center"
                style={{
                  maskImage: `url(/images/sequoia.svg)`,
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  maskSize: 'contain',
                  backgroundColor: 'currentColor',
                }}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Ask Sequoia about Jeevan</p>
          </TooltipContent>
        </Tooltip>
        <Badge
          variant="secondary"
          className={cn(
            'mt-2 text-sm font-light border-0 bg-transparent text-foreground',
            'group-hover:underline transition-all duration-300'
          )}
        >
          Sequoia AI
        </Badge>
      </div>
    </TooltipProvider>
  );
}
