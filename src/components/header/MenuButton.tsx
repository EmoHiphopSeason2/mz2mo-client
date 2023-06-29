import React from 'react';

import Menu from '@/assets/icons/menu.svg';

interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.ComponentProps<'button'>['onClick'];
  className?: React.ComponentProps<'button'>['className'];
}

const MenuButton = ({ onClick, className, ...props }: MenuButtonProps) => {
  return (
    <button onClick={onClick} className={className} {...props}>
      <Menu className="text-white w-7 h-7" />
    </button>
  );
};

export default MenuButton;
