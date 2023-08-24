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
    <div className="flex justify-center w-full">
      <button
        className={clsx(
          isClicked
            ? 'bg-gray-800 border-gray-600'
            : 'border-gray-900 bg-transparent',
          'transition-all  duration-75 rounded p-2 border text-2xl w-[50px] h-[50px] hover:border-gray-700',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default EmojiButton;
