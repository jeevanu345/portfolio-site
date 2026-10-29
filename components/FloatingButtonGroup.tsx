import React from 'react';
import { cn } from '@/lib/utils';
import AskSequoiaButton from './AskSequoiaButton';
import FloatingThemeSelectorLazy from './FloatingThemeSelectorLazy';

interface FloatingButtonGroupProps {
  currentLink: string;
  className?: string;
}

export const FloatingButtonGroup: React.FC<FloatingButtonGroupProps> = ({
  currentLink,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'select-none z-30 relative mx-auto mb-24 mt-6 w-fit sm:m-0 sm:fixed sm:right-2 md:right-12 sm:top-1/4',
        'flex flex-row sm:flex-col items-center gap-6 md:gap-10',
        className
      )}
    >
      {/* Floating Theme Selector */}
      <FloatingThemeSelectorLazy />

      {/* Ask Sequoia Button - Bottom */}
      <AskSequoiaButton currentLink={currentLink} />
    </div>
  );
};

export default FloatingButtonGroup;
