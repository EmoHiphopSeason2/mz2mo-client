import { atom } from 'jotai';

type PlaylistStoreType = {
  isOpenPlaylist: boolean;
};

export const playlistAtom = atom<PlaylistStoreType>({
  isOpenPlaylist: false,
});
