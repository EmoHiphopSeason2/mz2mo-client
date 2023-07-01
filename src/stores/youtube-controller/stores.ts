import { YoutubeControllerType } from '@/types/atom';
import { atom } from 'jotai';

const youtubeControllerAtom = atom<YoutubeControllerType>({
  playList: [],
  currentPlayingIndex: 0,
  loopState: 'none',
  isPlaying: true,
  volume: 0.5,
});

export default youtubeControllerAtom;
