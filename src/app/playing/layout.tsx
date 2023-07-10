'use client';

import { PropsWithChildren } from 'react';

import AppPortal from '@/components/app-portal';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <AppPortal.Provider portalName="emoji-picker-portal">
      <main className="w-[480px] h-screen flex-col bg-black drop-shadow-md m-auto">
        {children}
      </main>
    </AppPortal.Provider>
  );
};

export default Layout;
