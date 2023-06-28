import React from 'react';

import clsx from 'clsx';

interface EmojiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isClicked: boolean;
  children?: React.ReactNode;
  className?: React.ComponentProps<'button'>['className'];
}

const EmojiButton = ({
  isClicked,
  children,
  className,
  ...props
}: EmojiButtonProps) => {
  return (
    <button
      className={clsx(
        isClicked
          ? 'bg-gradient-to-br from-[#1853FF] to-[#18FF59]'
          : 'bg-transparent',
        'transition-all duration-75 rounded-lg hover:bg-gray-900 p-0.5',
        className,
      )}
      {...props}
    >
      <div
        className={clsx(
          isClicked ? 'bg-gray-900' : 'bg-transparent',
          'w-full p-2.5 hover:bg-gray-900 rounded-lg',
        )}
      >
        {children}
      </div>
    </button>
  );
};

export default EmojiButton;
