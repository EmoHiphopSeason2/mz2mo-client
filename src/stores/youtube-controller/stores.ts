import { atom } from 'jotai';

import { YoutubeControllerType } from '@/types/atom';

const youtubeControllerAtom = atom<YoutubeControllerType>({
  playerInstance: null,
  playList: ['dZs_cLHfnNA', '-9fC6oDFl5k'],
  currentDuration: 0,
  currentPlayingIndex: 0,
  loopState: 'all',
  isPlaying: false,
  volume: 0.5,
});

export default youtubeControllerAtom;
