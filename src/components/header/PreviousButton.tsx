import React from 'react';

import ArrowLeft from '@/assets/icons/arrowLeft.svg';

interface PreviousButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.ComponentProps<'button'>['onClick'];
  className?: React.ComponentProps<'button'>['className'];
}

const PreviousButton = ({ onClick, className }: PreviousButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <ArrowLeft className="text-white w-7 h-7" />
    </button>
  );
};

export default PreviousButton;
