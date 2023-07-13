'use client';

import AppPortal from '@/components/app-portal';
import ToastProvider from '@/components/toast/ToastProvider';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppPortal.Provider portalName="player-portal">
          <AppPortal.Provider portalName="toast-portal">
            <ToastProvider />
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
