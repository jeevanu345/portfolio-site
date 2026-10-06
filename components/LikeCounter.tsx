import { useEffect, useState } from 'react';
import { fetchLikes, formatNumber } from '../helpers/helpers';
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

export default function LikeCounter() {
  const [likeCount, setLikeCount] = useState(0);
  const [likeIncrements, setLikeIncrements] = useState(0);
  const [showEmojiTimeout, setShowEmojiTimeout] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);
  const [emojiVisible, setEmojiVisible] = useState(false);

  useEffect(() => {
    getLikes();
  }, []);

  useEffect(
    () => () => {
      if (showEmojiTimeout) clearTimeout(showEmojiTimeout);
    },
    [showEmojiTimeout]
  );

  const getIncrementsFromLocalStorage = () => {
    let likeIncrements = 0;
    try {
      likeIncrements = parseInt(localStorage.getItem('likeIncrements') || '0');
    } catch {}
    if (
      !Number.isFinite(likeIncrements) ||
      likeIncrements < 0 ||
      likeIncrements > 9
    ) {
      likeIncrements = 0;
    }
    return likeIncrements;
  };

  const getLikes = () => {
    fetchLikes()
      .then(res => {
        if (
          res &&
          typeof res.likes === 'number' &&
          Number.isFinite(res.likes)
        ) {
          const previousIncrement = getIncrementsFromLocalStorage();
          changeLikeIncrements(previousIncrement);
          setLikeCount(res.likes + previousIncrement);
        }
      })
      .catch(() => {
        const previous = getIncrementsFromLocalStorage();
        changeLikeIncrements(previous);
        setLikeCount(previous);
      });
  };

  const changeLikeIncrements = (increment: number) => {
    try {
      localStorage.setItem('likeIncrements', increment.toString());
    } catch {}
    setLikeIncrements(increment);
  };

  const resetLikes = () => {
    setLikeCount(likeCount - likeIncrements);
    changeLikeIncrements(0);
  };

  const updateLikes = () => {
    toggleEmoji();
    if (likeIncrements >= 9) {
      resetLikes();
      return;
    }
    changeLikeIncrements(likeIncrements + 1);
    setLikeCount(likeCount + 1);
    ReactGA.event({
      category: 'Button.Click',
      action: 'Like Counter',
    });
  };

  const toggleEmoji = () => {
    showEmojiTimeout && clearTimeout(showEmojiTimeout);
    setEmojiVisible(true);
    setShowEmojiTimeout(
      setTimeout(() => {
        setEmojiVisible(false);
      }, 3000)
    );
  };

  const getEmojiBasedOnIncrements = () => {
    switch (likeIncrements) {
      case 0:
        return `😢`;
      case 1:
        return `😐`;
      case 2:
        return `🙂`;
      case 3:
        return `😊`;
      case 4:
        return `😄`;
      case 5:
        return `😁`;
      case 6:
        return `😍`;
      case 7:
        return `🥰`;
      case 8:
        return `🤩`;
      case 9:
        return `🤯`;
    }
  };

  if (likeCount >= 0) {
    return (
      <TooltipProvider>
        <div className="flex flex-col items-center">
          <Tooltip open={emojiVisible}>
            <TooltipTrigger asChild>
              <Button
                onClick={updateLikes}
                id="like-counter-button"
                data-cursor={true}
                size="icon"
                variant="ghost"
                className={cn(
                  'relative rounded-full h-10 w-10 bg-white shadow-xs transition-all duration-75',
                  'overflow-hidden group hover:bg-white'
                )}
              >
                <div
                  className={cn(
                    'absolute w-10 bottom-0 z-10 border-2 rounded-full transition-all duration-300',
                    likeIncrements === 9
                      ? 'border-primary bg-primary'
                      : 'border-transparent bg-primary'
                  )}
                  style={{
                    height: `${
                      ((likeIncrements === 0 ? 0 : likeIncrements + 1) / 10) *
                      100
                    }%`,
                  }}
                />
                <div
                  className={cn(
                    'bg-slate-300/20 rounded-full flex justify-center items-center h-9 w-9 z-20 relative'
                  )}
                >
                  <img
                    data-cursor="like-counter-button"
                    src="/images/heart.svg"
                    className="w-full h-full z-30 rounded-full"
                    alt="Heart"
                  />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-transparent border-0 shadow-none text-lg"
            >
              {getEmojiBasedOnIncrements()}
            </TooltipContent>
          </Tooltip>
          <Badge
            variant={likeIncrements === 9 ? 'default' : 'outline'}
            className={cn(
              'mt-2 font-light text-sm border-0',
              likeIncrements === 9 ? 'text-primary-foreground' : ''
            )}
          >
            {formatNumber(likeCount)}
          </Badge>
        </div>
      </TooltipProvider>
    );
  }

  return null;
}
