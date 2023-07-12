import { atom } from 'jotai';

import { ToasterType } from '@/types/atom';

export const toasterAtom = atom<ToasterType>([]);
