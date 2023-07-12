'use client';

import dynamic from 'next/dynamic';

import AppPortal from '@/components/app-portal';

const YoutubePlayer = dynamic(
  () => import('@/components/bottom-player'),
  {
    ssr: false,
  },
);

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppPortal.Provider portalName="player-portal">
        <YoutubePlayer />
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
