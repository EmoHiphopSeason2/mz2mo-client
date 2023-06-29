import React from 'react';

import ArrowLeft from '@/assets/icons/arrowLeft.svg';

interface PreviousButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.ComponentProps<'button'>['onClick'];
  className?: React.ComponentProps<'button'>['className'];
}

const PreviousButton = ({
  onClick,
  className,
  ...props
}: PreviousButtonProps) => {
  return (
    <button onClick={onClick} className={className} {...props}>
      <ArrowLeft className="text-white w-7 h-7" />
    </button>
  );
};

export default PreviousButton;
