'use client';

import { useRef } from 'react';

import clsx from 'clsx';
import { useAtom, useAtomValue } from 'jotai';

import ControlNextIcon from '@/assets/icons/controlNext.svg';
import ControlPauseIcon from '@/assets/icons/controlPause.svg';
import ControlPlayIcon from '@/assets/icons/controlPlay.svg';
import ControlPrevIcon from '@/assets/icons/controlPrev.svg';
import { PlaylistButton } from '@/components/playlist';
import {
  controlCurrentDurationAtom,
  controlCurrentPlayingAtom,
  controlPlayingStateAtom,
  playerInstanceAtom,
} from '@/stores/youtube-controller';

import * as styles from './BottomMusicPlayer.module.css';

const BottomMusicPlayer = () => {
  const progressRef = useRef<HTMLProgressElement | null>(null);

  const [isPlaying, setIsPlaying] = useAtom(controlPlayingStateAtom);
  const [currentIndex, setCurrentIndex] = useAtom(controlCurrentPlayingAtom);
  const [currentDuration, setCurrentDuration] = useAtom(
    controlCurrentDurationAtom,
  );

  const playerInstance = useAtomValue(playerInstanceAtom);

  // NOTE : PlayerInstance 가 init 되지 않았다면 회색 Progress Bar를 보여주기 위해 1로 설정
  const maxDuration = playerInstance?.getDuration() ?? 1;
  const PlayingIcon = isPlaying ? ControlPauseIcon : ControlPlayIcon;

  const togglePlayingState = () =>
    setIsPlaying({ action: isPlaying ? 'stop' : 'start' });

  // NOTE : 재생하고자 하는 음악 변경 시 애니메이션도 처음부터 다시 재생시키는 로직 추가
  const selectPlaylist = (type: 'prev' | 'next') =>
    setCurrentIndex(currentIndex + (type === 'prev' ? -1 : 1));

  const handleCurrentDuration = (e: React.MouseEvent<HTMLProgressElement>) => {
    if (!progressRef.current || !playerInstance) return;

    const MAX_LENGTH = progressRef.current.offsetWidth;
    const { offsetX } = e.nativeEvent;
    const nextDuration = (maxDuration * (MAX_LENGTH - offsetX)) / MAX_LENGTH;

    playerInstance.seekTo(nextDuration, true);
    setCurrentDuration(nextDuration);
  };

  return (
    <>
      <section className="sticky bottom-0 z-musicPlayer mx-auto flex w-[100%] min-w-[360px] max-w-[480px] flex-col">
        <progress
          ref={progressRef}
          value={maxDuration - currentDuration}
          max={maxDuration}
          className={clsx(styles.progress, 'h-[3px] w-[100%] rotate-180')}
          onClick={handleCurrentDuration}
        />
        <div className="flex h-20 items-center gap-[17px] bg-gray-900 px-5 py-4">
          <div className="flex flex-col flex-1 mr-auto overflow-hidden">
            {playerInstance ? (
              <>
                <h4 className="overflow-hidden text-white text-ellipsis whitespace-nowrap">
                  {'한 페이지가 될 수 있게 (Time of Our Life)'}
                </h4>
                <p className="overflow-hidden text-white text-ellipsis whitespace-nowrap">
                  DAY6
                </p>
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-5">
              <ControlPrevIcon
                width={18}
                height={18}
                className="my-auto text-white cursor-pointer"
                onClick={() => selectPlaylist('prev')}
              />
              <PlayingIcon
                width={32}
                height={32}
                className="text-white cursor-pointer"
                onClick={togglePlayingState}
              />
              <ControlNextIcon
                width={18}
                height={18}
                className="my-auto text-white cursor-pointer"
                onClick={() => selectPlaylist('next')}
              />
            </div>
            <PlaylistButton
              iconSize={32}
              className="text-white cursor-pointer"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BottomMusicPlayer;
