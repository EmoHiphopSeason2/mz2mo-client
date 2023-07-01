'use client';

import { useRef, useState } from 'react';

import { controlCurrentPlayingAtom } from '@/stores/youtube-controller';
import youtubeControllerAtom from '@/stores/youtube-controller/stores';
import { useAtomValue, useSetAtom } from 'jotai';
import YouTubePlayer from 'react-player/youtube';

const YoutubePlayer = () => {
  const youtubePlayerRef = useRef<YouTubePlayer | null>(null);
  const { isPlaying, loopState, volume, playList, currentPlayingIndex } =
    useAtomValue(youtubeControllerAtom);

  const setCurrentPlayingIndex = useSetAtom(controlCurrentPlayingAtom);

  const currentPlayingUrl = `https://www.youtube.com/watch?v=${playList[currentPlayingIndex]}`;
  const isLoop = loopState !== 'none' && !!playList.length;
  const onEnd = () => {
    if (loopState === 'all')
      setCurrentPlayingIndex({
        index: (currentPlayingIndex + 1) % playList.length,
      });
  };

  return (
    <YouTubePlayer
      light
      loop={isLoop}
      style={{ display: 'none' }}
      ref={youtubePlayerRef}
      url={currentPlayingUrl}
      volume={volume}
      playing={isPlaying}
      onEnd={onEnd}
    />
  );
};

export default YoutubePlayer;
