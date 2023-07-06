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
        <AppPortal.Provider portalName="modal-portal">
          <AppPortal.Provider portalName="emoji-picker-portal">
            <AppPortal.Wrapper portalName="modal-portal">
              <div className="z-10">
                <p>test another portal</p>
              </div>
            </AppPortal.Wrapper>
            {children}
          </AppPortal.Provider>
        </AppPortal.Provider>
      </AppPortal.Provider>
    </>
  );
}
