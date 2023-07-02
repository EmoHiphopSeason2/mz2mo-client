'use client';

import { useEffect, useRef, useState } from 'react';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import ReactPlayer from 'react-player/lazy';

import CONTROL_OPTION from '@/constants/YoutubePlayerController';
import { controlCurrentPlayingAtom, controlCurrentDurationAtom, playerInstanceAtom } from '@/stores/youtube-controller';
import youtubeControllerAtom from '@/stores/youtube-controller/stores';

const YoutubePlayer = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const setCurrentPlayingIndex = useSetAtom(controlCurrentPlayingAtom);

  const [currentDuration, setCurrentDuration] = useAtom(controlCurrentDurationAtom);
  const [playerInstance, applyPlayerInstance] = useAtom(playerInstanceAtom);
  const { isPlaying, loopState, volume, playList, currentPlayingIndex } =
    useAtomValue(youtubeControllerAtom);

  const currentPlayingUrl = `https://www.youtube.com/watch?v=${playList[currentPlayingIndex]}`;
  const isLoop = loopState === CONTROL_OPTION.LOOP.ONCE && !!playList.length;

  const onEnded = () => {
    if (loopState === CONTROL_OPTION.LOOP.ALL)
      setCurrentPlayingIndex((currentPlayingIndex + 1) % playList.length);
  };

  const onReady = () => {
    setIsPlayerReady(true);
    applyPlayerInstance({ ref: playerRef.current?.getInternalPlayer() as YT.Player });
  };

  const onProgress = () => {
    if (!playerInstance) return;

    const currentTime: number = playerInstance.getCurrentTime().toFixed(2);
    setCurrentDuration(currentTime)
  }

  useEffect(() => {
    if (!playerInstance || !isPlayerReady) return;

    playerInstance.seekTo(currentDuration, true);
    isPlaying ? playerInstance.playVideo() : playerInstance.pauseVideo();
  }, [playerInstance, isPlayerReady, isPlaying]);

  return (
    <ReactPlayer
      style={{display: 'none'}}
      loop={isLoop}
      ref={playerRef}
      url={currentPlayingUrl}
      volume={volume}
      playing={isPlaying}
      controls
      onEnded={onEnded}
      onReady={onReady}
      onProgress={onProgress}
      progressInterval={100}
    />
  );
};

export default YoutubePlayer;
