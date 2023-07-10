'use client';

import AppPortal from '@/components/app-portal';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AppPortal.Provider portalName="player-portal">
      <AppPortal.Provider portalName="modal-portal">
        {children}
      </AppPortal.Provider>
    </AppPortal.Provider>
  );
}
