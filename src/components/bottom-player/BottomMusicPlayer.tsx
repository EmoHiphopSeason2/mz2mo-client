'use client';

import { useCallback, useRef } from 'react';

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
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const titleBoxRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useAtom(controlPlayingStateAtom);
  const [currentIndex, setCurrentIndex] = useAtom(controlCurrentPlayingAtom);
  const [currentDuration, setCurrentDuration] = useAtom(
    controlCurrentDurationAtom,
  );

  const playerInstance = useAtomValue(playerInstanceAtom);

  // NOTE : PlayerInstance 가 init 되지 않았다면 회색 Progress Bar를 보여주기 위해 1로 설정
  const maxDuration = playerInstance?.getDuration() ?? 1;
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
    if (!progressRef.current || !playerInstance) return;

    const MAX_LENGTH = progressRef.current.offsetWidth;
    const { offsetX } = e.nativeEvent;
    const nextDuration = (maxDuration * (MAX_LENGTH - offsetX)) / MAX_LENGTH;

    playerInstance.seekTo(nextDuration, true);
    setCurrentDuration(nextDuration);
  };

  const isOverflow = (node: 'songTitle' | 'singerName') => {
    const nodeIndex = node === 'songTitle' ? 0 : 1;
    const childNode = titleBoxRef.current?.childNodes[nodeIndex];
    if (childNode instanceof HTMLElement && titleBoxRef.current) {
      const { offsetWidth: childNodeWidth } = childNode;
      const { offsetWidth: titleBoxWidth } = titleBoxRef.current;
      return childNodeWidth >= titleBoxWidth;
    }
    return false;
  };

  // NOTE : 곡 제목과 가수 명을 담은 DOM 중 width가 큰 값을 구하는 함수 getLongestWidthInTitleBox
  const getLongestWidthInTitleBox = () => {
    const childNodeList = titleBoxRef.current?.childNodes;
    if (!childNodeList) return;

    return Math.max(
      ...Array.from(childNodeList).map((childNode) => {
        return childNode instanceof HTMLElement ? childNode.offsetWidth : 0;
      }),
    );
  };

  const animateWidthStyle = {
    '--right-side': `${titleBoxRef.current?.offsetWidth}px`,
    '--left-side': `-${getLongestWidthInTitleBox()}px`,
  } as React.CSSProperties;

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
          <div
            className="flex flex-col mr-auto overflow-hidden flex-1"
            ref={titleBoxRef}
          >
            {playerInstance ? (
              <>
                <h4
                  style={animateWidthStyle}
                  className={clsx(
                    isOverflow('songTitle') && styles.longText,
                    !isPlaying && styles.isStopped,
                    'text-white text-clip whitespace-nowrap w-fit',
                  )}
                >
                  이브, 프시케 그리고 푸른 수염의 아내
                </h4>
                <p
                  style={animateWidthStyle}
                  className={clsx(
                    isOverflow('singerName') && styles.longText,
                    !isPlaying && styles.isStopped,
                    'text-body3 text-white text-clip whitespace-nowrap w-fit',
                  )}
                >
                  LE SSERAFIM
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
