import React from 'react';

interface LogoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.ComponentProps<'button'>['onClick'];
  className?: React.ComponentProps<'button'>['className'];
}

const LogoButton = ({ onClick, className }: LogoButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {/* TODO: 로고 아이콘 추가 */}
      로고
    </button>
  );
};

export default LogoButton;
