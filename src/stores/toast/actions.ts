import { atom } from 'jotai';

import { toasterAtom } from '@/stores/toast/stores';
import { ToastType } from '@/types/atom';

export const useToastAtom = atom(
  (get) => get(toasterAtom).toasts,
  (get, set, type: ToastType) => (title: string, message: string) => {
    const prevAtom = get(toasterAtom);
    set(toasterAtom, {
      toasts: [
        {
          type,
          title,
          message,
          id: prevAtom.sequence.toString(),
        },
        ...prevAtom.toasts,
      ],
      sequence: prevAtom.sequence + 1,
    });
  },
);

export const removeToastAtom = atom(
  (get) => get(toasterAtom),
  (get, set, toastId: string) => {
    const prevAtom = get(toasterAtom);
    set(toasterAtom, {
      toasts: prevAtom.toasts.filter((toast) => toast.id !== toastId),
      sequence: prevAtom.sequence,
    });
  },
);
