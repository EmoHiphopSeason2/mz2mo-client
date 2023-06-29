import React from 'react';

import ChevronLeft from '@/assets/icons/chevronLeft.svg';
import ChevronRight from '@/assets/icons/chevronRight.svg';
import clsx from 'clsx';

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'left' | 'right';
  className?: React.ComponentProps<'button'>['className'];
}

const ArrowButton = ({ direction, className, ...props }: ArrowButtonProps) => {
  const ChevronIcon = direction === 'right' ? ChevronRight : ChevronLeft;
  return (
    <button
      className={clsx(
        className,
        'rounded-full bg-white/60 p-2.5 text-white transition-all delay-75 hover:bg-white hover:text-gray-800',
      )}
      {...props}
    >
      <ChevronIcon className="w-24 h-24" />
    </button>
  );
};

export default ArrowButton;
