import { atom } from 'jotai';

import { playlistAtom } from '@/components/playlist/store';

export const useToastAtom = atom(
  (get) => get(playlistAtom).isOpenPlaylist,
  (get, set, isOpenPlaylist: boolean) => {
    set(playlistAtom, {
      isOpenPlaylist,
    });
  },
);
