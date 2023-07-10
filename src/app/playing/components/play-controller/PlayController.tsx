'use client';

import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { controlPlayingStateAtom, controlCurrentPlayingAtom, controlLoopStateAtom } from '@/stores/youtube-controller';

import ControlNextIcon from '@/assets/icons/controlNext.svg';
import ControlPauseIcon from '@/assets/icons/controlPause.svg';
import ControlPlayIcon from '@/assets/icons/controlPlay.svg'
import ControlPrevIcon from '@/assets/icons/controlPrev.svg';
import LoopIcon from '@/assets/icons/loop.svg';
import LoopOnceIcon from '@/assets/icons/loopOnce.svg'
import VolumeIcon from '@/assets/icons/volume.svg';

const PlayController = () => {
  const [isPlaying, setIsPlaying] = useAtom(controlPlayingStateAtom);
  const [currentIndex, setCurrentIndex] = useAtom(controlCurrentPlayingAtom);
  const [loopState, setLoopState] = useAtom(controlLoopStateAtom);

  const PlayingIcon = isPlaying ? ControlPauseIcon : ControlPlayIcon;
  const LoopStateIcon = useCallback(() => {
    switch (loopState) {
      case 'once':
        return <LoopOnceIcon className="my-auto text-white" onClick={toggleLoopState}/>
      case 'all':
        return <LoopIcon className="my-auto text-white" onClick={toggleLoopState}/>;
      case 'none':
        return <LoopIcon className="my-auto text-gray-800" onClick={toggleLoopState}/>;
    }
  }, [loopState]);

  const togglePlayingState = useCallback(() => {
    setIsPlaying({ action: isPlaying ? "stop" : "start" });
  }, [isPlaying])

  const toggleLoopState = useCallback(() => {
    const loopStateList: ('none' | 'all' | 'once')[] = ['none', 'all', 'once'];
    const nextLoopState = loopStateList[(loopStateList.indexOf(loopState) + 1) % 3];
    setLoopState({ action: nextLoopState });
  }, [loopState])
  
  return (
    <div className="max-w-[296px] flex gap-[52px] mx-auto my-[21px]">
      <LoopStateIcon />
      <div className="flex gap-[23px] items-center">
        <ControlPrevIcon
          width={24}
          height={24}
          className="text-white my-auto"
          onClick={() => setCurrentIndex(currentIndex - 1)}
        />
        <PlayingIcon width={50} height={50} className="text-white cursor-pointer" onClick={togglePlayingState}/>
        <ControlNextIcon
          width={24}
          height={24}
          className="text-white my-auto"
          onClick={() => setCurrentIndex(currentIndex + 1)}
        />
      </div>
      <VolumeIcon className="my-auto" />
    </div>
  );
};

export default PlayController;
