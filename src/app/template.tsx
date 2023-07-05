'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import AppPortal from '@/components/app-portal';

const YoutubePlayerController = dynamic(
  () => import('@/components/youtube-player'),
  {
    ssr: false,
  },
);

export default function Template({ children }: { children: React.ReactNode }) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => setIsRendered(true), []);

  return (
    <>
      <AppPortal.Provider portalName="player-portal">
          {isRendered ? <YoutubePlayerController /> : null}
          {children}
      </AppPortal.Provider>
    </>
  );
}
