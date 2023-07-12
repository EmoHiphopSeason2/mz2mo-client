import React from 'react';

import { useAtomValue } from 'jotai';

import AppPortal from '@/components/app-portal/AppPortal';
import Toast from '@/components/toast/Toast';
import { useToastAtom } from '@/stores/toast';

const Toaster = () => {
  const toasts = useAtomValue(useToastAtom);
  return (
    <AppPortal.Provider portalName="toast-portal">
      <div className="fixed space-y-2 -translate-x-1/2 left-1/2 top-4">
        {toasts.map((toast) => {
          return <Toast key={toast.id} {...toast} />;
        })}
      </div>
    </AppPortal.Provider>
  );
};

export default Toaster;
