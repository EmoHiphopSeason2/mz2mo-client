import React from 'react';

import clsx from 'clsx';

import ArrowRight from '@/assets/icons/arrowRight.svg';

interface LongButtonConfig
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hasArrow?: boolean;
  className?: React.ComponentProps<'button'>['className'];
  children?: React.ReactNode;
}

const LongButton = ({
  hasArrow = false,
  className,
  children,
  disabled,
  ...props
}: LongButtonConfig) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        className,
        !disabled &&
          'hover:bg-gradient-to-r hover:from-[#1853FF] hover:to-[#18FFFF]',
        'inline-flex transition-all w-full delay-75 items-center justify-center rounded-md bg-[#1853FF] px-4 py-2.5 text-white disabled:bg-gray-900',
      )}
      {...props}
    >
      {children}
      {hasArrow && <ArrowRight className="w-5 h-5 ml-1" />}
    </button>
  );
};

export default LongButton;
