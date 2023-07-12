'use client';

import { useCallback } from 'react';

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
import FormatUtil from '@/utils/format';

import * as styles from './BottomMusicPlayer.module.css';

const BottomMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useAtom(controlPlayingStateAtom);
  const [currentIndex, setCurrentIndex] = useAtom(controlCurrentPlayingAtom);
  const [currentDuration, setCurrentDuration] = useAtom(
    controlCurrentDurationAtom,
  );

  const playerInstance = useAtomValue(playerInstanceAtom);
  const maxDuration = playerInstance?.getDuration() ?? currentDuration;

  const PlayingIcon = isPlaying ? ControlPauseIcon : ControlPlayIcon;

  const togglePlayingState = useCallback(() => {
    setIsPlaying({ action: isPlaying ? 'stop' : 'start' });
  }, [isPlaying]);

  const selectPlaylist = {
    prevSong: useCallback(
      () => setCurrentIndex(currentIndex - 1),
      [currentIndex],
    ),
    nextSong: useCallback(
      () => setCurrentIndex(currentIndex + 1),
      [currentIndex],
    ),
  };

  const handleCurrentDuration = (e: React.MouseEvent<HTMLProgressElement>) => {
    const MAX_LENGTH = 480;
    const { offsetX } = e.nativeEvent;
    const nextDuration = (maxDuration * (MAX_LENGTH - offsetX)) / MAX_LENGTH;

    playerInstance?.seekTo(nextDuration, true);
    setCurrentDuration(nextDuration);
  };

  return (
    <>
      <section className="flex flex-col min-w-[360px] max-w-[480px] mx-auto">
        <progress
          value={maxDuration - currentDuration}
          max={maxDuration}
          className={clsx(
            styles.progress,
            'min-w-[360px] max-w-[480px] h-[3px] rotate-180',
          )}
          onClick={handleCurrentDuration}
        />
        <div className="bg-gray-900 py-4 px-5 flex gap-[17px] items-center">
          <div className="flex flex-col mr-auto">
            <h4 className="text-h4 text-white">
              {FormatUtil.formatTextEllipsis('Hype Boy', 10)}
            </h4>
            <p className="text-body3 text-white">NewJeans</p>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-[23px] items-center">
              <ControlPrevIcon
                width={20}
                height={20}
                className="text-white my-auto"
                onClick={selectPlaylist.prevSong}
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
                onClick={selectPlaylist.nextSong}
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
