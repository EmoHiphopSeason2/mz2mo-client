'use client';

import { useRef, useState } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';
import YouTubePlayer from 'react-player/youtube';

import { controlCurrentPlayingAtom } from '@/stores/youtube-controller';
import youtubeControllerAtom from '@/stores/youtube-controller/stores';

const YoutubePlayer = () => {
  const youtubePlayerRef = useRef<YouTubePlayer | null>(null);
  const { isPlaying, loopState, volume, playList, currentPlayingIndex } =
    useAtomValue(youtubeControllerAtom);

  const setCurrentPlayingIndex = useSetAtom(controlCurrentPlayingAtom);

  const isLoop = loopState !== 'none' && !!playList.length;
  const onEnd = () => {
    if (loopState === 'all')
        setCurrentPlayingIndex({ index: (currentPlayingIndex + 1) % playList.length });
  }
  

  return (
    <YouTubePlayer
      light
      loop={isLoop}
      style={{ display: 'none' }}
      ref={youtubePlayerRef}
      url={playList[currentPlayingIndex]}
      volume={volume}
      playing={isPlaying}
      onEnd={onEnd}
    />
  );
};

export default YoutubePlayer;
