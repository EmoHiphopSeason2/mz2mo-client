import React from 'react';

import { useAtomValue } from 'jotai';

import AppPortal from '@/components/app-portal/AppPortal';
import Toast from '@/components/toast/Toast';
import { useToastAtom } from '@/stores/toast';

const Toaster = () => {
  const toasts = useAtomValue(useToastAtom);
  return (
    <AppPortal.Wrapper portalName="toast-portal">
      <div className="fixed space-y-2 -translate-x-1/2 left-1/2 top-32">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </AppPortal.Wrapper>
  );
};

export default Toaster;
