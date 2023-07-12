import { atom } from 'jotai';

import { ToastType } from '@/types/atom';

export const toasterAtom = atom<ToastType[]>([]);
