import { useAtom } from 'jotai';

import { useToastAtom } from '@/components/playlist/store';

export const usePlaylist = () => {
  const [isOpenPlaylist, setIsOpenPlaylist] = useAtom(useToastAtom);

  return {
    isOpenPlaylist,
    openPlaylist: () => setIsOpenPlaylist(true),
    closePlaylist: () => setIsOpenPlaylist(false),
  };
};
