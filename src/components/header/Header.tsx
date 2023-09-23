import React from 'react';

interface HeaderProps {
  headerLeft?: React.ReactNode;
  headerCenter?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const Header = ({ headerLeft, headerCenter, headerRight }: HeaderProps) => {
  return (
    <header className="sticky top-0 flex items-center justify-between w-full px-5 py-3 bg-black z-header">
      {headerLeft}
      {headerCenter}
      {headerRight}
    </header>
  );
};

export default Header;
