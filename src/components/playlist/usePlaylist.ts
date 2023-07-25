import { atom, useAtom } from 'jotai';

type PlaylistStoreType = {
  isOpenPlaylist: boolean;
};

const playlistAtom = atom<PlaylistStoreType>({
  isOpenPlaylist: false,
});

const useToastAtom = atom(
  (get) => get(playlistAtom).isOpenPlaylist,
  (get, set, type: string) => {
    switch (type) {
      case 'open':
        set(playlistAtom, {
          isOpenPlaylist: true,
        });
        break;
      case 'close':
        set(playlistAtom, {
          isOpenPlaylist: false,
        });
        break;
      default:
        break;
    }
  },
);

export const usePlaylist = () => {
  const [isOpenPlaylist, setIsOpenPlaylist] = useAtom(useToastAtom);

  return {
    isOpenPlaylist,
    openPlaylist: () => setIsOpenPlaylist('open'),
    closePlaylist: () => setIsOpenPlaylist('close'),
  };
};
