'use client';

import AppPortal from '@/components/app-portal';
import ToastProvider from '@/components/toast/ToastProvider';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AppPortal.Provider portalName="player-portal" />
      <AppPortal.Provider portalName="emoji-picker-portal" />
      <AppPortal.Provider portalName="modal-portal" />
      <AppPortal.Provider portalName="toast-portal">
        <ToastProvider />
      </AppPortal.Provider>
    </>
  );
}
