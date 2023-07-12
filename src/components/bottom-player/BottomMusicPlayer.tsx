'use client';

import { useRef } from 'react';

import clsx from 'clsx';
import { useAtom, useAtomValue } from 'jotai';

import ControlNextIcon from '@/assets/icons/controlNext.svg';
import ControlPauseIcon from '@/assets/icons/controlPause.svg';
import ControlPlayIcon from '@/assets/icons/controlPlay.svg';
import ControlPrevIcon from '@/assets/icons/controlPrev.svg';
import PlayListIcon from '@/assets/icons/playlist.svg';
import YoutubePlayer from '@/components/youtube-player';
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
      <section className="flex flex-col w-[100%] min-w-[360px] max-w-[480px] mx-auto fixed bottom-0 z-musicPlayer">
        <progress
          ref={progressRef}
          value={maxDuration - currentDuration}
          max={maxDuration}
          className={clsx(styles.progress, 'w-[100%] h-[3px] rotate-180')}
          onClick={handleCurrentDuration}
        />
        <div className="bg-gray-900 py-4 px-5 flex gap-[17px] h-20 items-center">
          <div className="flex flex-col mr-auto flex-1 overflow-hidden">
            {playerInstance ? (
              <>
                <h4 className="text-white whitespace-nowrap text-ellipsis overflow-hidden">
                  {'한 페이지가 될 수 있게 (Time of Our Life)'}
                </h4>
                <p className="text-body3 text-white whitespace-nowrap text-ellipsis overflow-hidden">
                  DAY6
                </p>
              </>
            ) : null}
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-[23px] items-center">
              <ControlPrevIcon
                width={20}
                height={20}
                className="text-white my-auto"
                onClick={() => selectPlaylist('prev')}
              />
              <PlayingIcon
                width={40}
                height={40}
                className="text-white cursor-pointer"
                onClick={togglePlayingState}
              />
              <ControlNextIcon
                width={20}
                height={20}
                className="text-white my-auto"
                onClick={() => selectPlaylist('next')}
              />
            </div>
            <PlayListIcon
              width={40}
              height={40}
              className="text-white cursor-pointer"
            />
          </div>
        </div>
      </section>
      <YoutubePlayer />
    </>
  );
};

export default BottomMusicPlayer;
