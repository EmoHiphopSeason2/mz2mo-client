import { atom } from 'jotai';

import { YoutubeControllerType } from '@/types/atom';

const youtubeControllerAtom = atom<YoutubeControllerType>({
  playList: ['5g-glh0eTYY', '09qQnnJsWus', 'WHvkcNaDcBk'],
  currentPlayingIndex: 0,
  loopState: 'all',
  isPlaying: false,
  volume: 0.5,
});

export default youtubeControllerAtom;
