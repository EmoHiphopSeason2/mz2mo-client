import React from 'react';

import clsx from 'clsx';

import ArrowRight from '@/assets/icons/arrowRight.svg';

interface BasicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg';
  hasArrow?: boolean;
  className?: React.ComponentProps<'button'>['className'];
  children?: React.ReactNode;
}

const BasicButtonConfig = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

const BasicButton = ({
  size,
  hasArrow = false,
  className,
  children,
  ...props
}: BasicButtonProps) => {
  return (
    <button className={clsx(className, BasicButtonConfig[size])} {...props}>
      {hasArrow && <ArrowRight className="w-4 h-4 mr-1" />}
      {children}
    </button>
  );
};

export default BasicButton;
