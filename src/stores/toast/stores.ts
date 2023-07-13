import { atom } from 'jotai';

import { ToastProviderType } from '@/types/atom';

export const toasterAtom = atom<ToastProviderType>({
  toasts: [],
  sequence: 0,
});
