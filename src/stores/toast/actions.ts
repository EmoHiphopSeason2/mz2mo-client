import { atom } from 'jotai';
import { v4 as uid } from 'uuid';

import { toasterAtom } from '@/stores/toast/stores';
import { ToastType } from '@/types/atom';

export const useToastAtom = atom(
  (get) => get(toasterAtom),
  (get, set, type: ToastType) => (title: string, message: string) => {
    const prevAtom = get(toasterAtom);
    set(toasterAtom, [
      {
        type,
        title,
        message,
        id: uid(),
      },
      ...prevAtom,
    ]);
  },
);

export const removeToastAtom = atom(
  (get) => get(toasterAtom),
  (get, set, toastId: string) => {
    const prevAtom = get(toasterAtom);
    set(toasterAtom, [...prevAtom.filter((toast) => toast.id !== toastId)]);
  },
);
