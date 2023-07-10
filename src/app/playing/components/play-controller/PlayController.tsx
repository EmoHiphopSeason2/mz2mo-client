'use client';

import { useCallback } from 'react';

import clsx from 'clsx';
import { useAtom } from 'jotai';

import ControlNextIcon from '@/assets/icons/controlNext.svg';
import ControlPauseIcon from '@/assets/icons/controlPause.svg';
import ControlPlayIcon from '@/assets/icons/controlPlay.svg';
import ControlPrevIcon from '@/assets/icons/controlPrev.svg';
import LoopIcon from '@/assets/icons/loop.svg';
import LoopOnceIcon from '@/assets/icons/loopOnce.svg';
import VolumeIcon from '@/assets/icons/volume.svg';
import VolumeOffIcon from '@/assets/icons/volumeOff.svg';
import useToggle from '@/hooks/useToggle';
import {
  controlCurrentPlayingAtom,
  controlLoopStateAtom,
  controlPlayingStateAtom,
  controlVolumeAtom,
} from '@/stores/youtube-controller';

import * as styles from './PlayController.module.scss';

const PlayController = () => {
  const [isShowVolumeBar, toggleVolumeBar] = useToggle(false);

  const [isPlaying, setIsPlaying] = useAtom(controlPlayingStateAtom);
  const [currentIndex, setCurrentIndex] = useAtom(controlCurrentPlayingAtom);
  const [loopState, setLoopState] = useAtom(controlLoopStateAtom);
  const [volume, setVolume] = useAtom(controlVolumeAtom);

  const PlayingIcon = isPlaying ? ControlPauseIcon : ControlPlayIcon;
  const VolumeStateIcon = volume > 0 ? VolumeIcon : VolumeOffIcon;
  const LoopStateIcon = useCallback(() => {
    switch (loopState) {
      case 'once':
        return (
          <LoopOnceIcon
            className="my-auto text-white cursor-pointer"
            onClick={toggleLoopState}
          />
        );
      case 'all':
        return (
          <LoopIcon
            className="my-auto text-white cursor-pointer"
            onClick={toggleLoopState}
          />
        );
      case 'none':
        return (
          <LoopIcon
            className="my-auto text-gray-800 cursor-pointer"
            onClick={toggleLoopState}
          />
        );
    }
  }, [loopState]);

  const togglePlayingState = useCallback(() => {
    setIsPlaying({ action: isPlaying ? 'stop' : 'start' });
  }, [isPlaying]);

  const toggleLoopState = useCallback(() => {
    const loopStateList: ('none' | 'all' | 'once')[] = ['none', 'all', 'once'];
    const nextLoopState =
      loopStateList[(loopStateList.indexOf(loopState) + 1) % 3];
    setLoopState({ action: nextLoopState });
  }, [loopState]);

  const handleVolumeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  // NOTE : 현재 볼륨 수준을 CSS 변수로 선언하고, SCSS 모듈에서 사용하기 위한 코드
  const volumeBarStyle = {
    '--volume-percent': `${volume * 100}%`,
  } as React.CSSProperties;

  return (
    <div className="max-w-[296px] flex gap-[52px] mx-auto my-[21px]">
      <LoopStateIcon />
      <div className="flex gap-[23px] items-center">
        <ControlPrevIcon
          width={24}
          height={24}
          className="text-white my-auto cursor-pointer"
          onClick={() => setCurrentIndex(currentIndex - 1)}
        />
        <PlayingIcon
          width={50}
          height={50}
          className="text-white cursor-pointer"
          onClick={togglePlayingState}
        />
        <ControlNextIcon
          width={24}
          height={24}
          className="text-white my-auto cursor-pointer"
          onClick={() => setCurrentIndex(currentIndex + 1)}
        />
      </div>
      <div className="flex flex-col item-center relative">
        <VolumeStateIcon
          className="text-white my-auto cursor-pointer"
          onClick={toggleVolumeBar}
        />
        {isShowVolumeBar && (
          <input
            style={volumeBarStyle}
            className={clsx(
              styles.volumeBar,
              'absolute -rotate-90 w-20 h-1 -left-[28px] -top-[28px] bg-gray-800 rounded-lg color-white',
            )}
            type="range"
            max={1}
            min={0}
            step={0.01}
            value={volume}
            onChange={handleVolumeRange}
          />
        )}
      </div>
    </div>
  );
};

export default PlayController;
