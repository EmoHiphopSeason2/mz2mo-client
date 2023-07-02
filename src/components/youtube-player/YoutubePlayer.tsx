'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import { controlCurrentPlayingAtom } from '@/stores/youtube-controller';
import youtubeControllerAtom from '@/stores/youtube-controller/stores';

const YoutubePlayer = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const setCurrentPlayingIndex = useSetAtom(controlCurrentPlayingAtom);
  const { isPlaying, loopState, volume, playList, currentPlayingIndex } =
    useAtomValue(youtubeControllerAtom);

  const currentPlayingUrl = `https://www.youtube.com/watch?v=${playList[currentPlayingIndex]}`;
  const isLoop = loopState === 'once' && !!playList.length;

  const onEnded = () => {
    console.log('trigger');
    if (loopState === 'all')
      setCurrentPlayingIndex({
        index: (currentPlayingIndex + 1) % playList.length,
      });
  };

  const onReady = () => {
    setIsPlayerReady(true);
  };

  useEffect(() => {
    const playerInstance = playerRef.current?.getInternalPlayer();
    if (!playerInstance) return;

    // NOTICE : 재생 상태, 볼륨 수준에 따라 player DOM을 제어하기 위한 로직
    isPlaying ? playerInstance.playVideo() : playerInstance.pauseVideo();
  }, [isPlayerReady, isPlaying, volume]);

  return (
    <ReactPlayer
      loop={isLoop}
      ref={(elm) => {
        playerRef.current = elm;
      }}
      url={currentPlayingUrl}
      volume={volume}
      playing={isPlaying}
      controls
      onEnded={onEnded}
      onReady={onReady}
      onProgress={() => {
          const currentTime = Math.floor(Number(playerRef.current?.getCurrentTime()));
          const wholeTime = Math.floor(Number(playerRef.current?.getDuration()));
          console.log(`${currentTime} / ${wholeTime} (${(currentTime / wholeTime * 100).toFixed(2)}%)`)
        }
      }
    />
  );
};

export default YoutubePlayer;
