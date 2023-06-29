import React from 'react';

interface HeaderProps {
  headerLeft?: React.ReactNode;
  headerCenter?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const Header = ({ headerLeft, headerCenter, headerRight }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-5 py-3">
      {headerLeft}
      {headerCenter}
      {headerRight}
    </header>
  );
};

export default Header;
