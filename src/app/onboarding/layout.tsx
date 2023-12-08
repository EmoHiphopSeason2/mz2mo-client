'use client';

import { PropsWithChildren } from 'react';

import OnboardingContextProvider from '@/domains/onboarding/OnboardingContext';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex flex-col w-full h-screen overflow-hidden bg-black drop-shadow-md">
      <OnboardingContextProvider>{children}</OnboardingContextProvider>
    </main>
  );
};

export default Layout;
