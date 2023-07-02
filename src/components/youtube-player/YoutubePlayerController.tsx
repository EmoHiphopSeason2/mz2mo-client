'use client';

import { useState } from 'react';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import ReactPlayer from 'react-player/youtube';

import {
  controlCurrentDurationAtom,
  controlCurrentPlayingAtom,
  controlPlayingStateAtom,
  controlPlaylistAtom,
  controlVolumeAtom,
  playerInstanceAtom,
} from '@/stores/youtube-controller';

import YoutubePlayer from './YoutubePlayer';

// FIXME : 테스트용으로 만들어둔 YoutubePlayerWrapper, 추후 관련 기능 및 UI 고도화 필요
const YoutubePlayerController = () => {
  const [songVid, setSongVid] = useState('');
  const [playIndex, setPlayIndex] = useState(0);

  const setPlayingState = useSetAtom(controlPlayingStateAtom);
  const playerInstance = useAtomValue(playerInstanceAtom);

  const [currentDuration, setCurrentDuration] = useAtom(controlCurrentDurationAtom);
  const [playList, setPlayList] = useAtom(controlPlaylistAtom);
  const [volume, setVolume] = useAtom(controlVolumeAtom);
  const [currentPlayIndex, setCurrentPlayIndex] = useAtom(
    controlCurrentPlayingAtom,
  )

  const isPlayerEnabled = playerInstance !== null;

  const handlePlay = (action: 'start' | 'stop') => {
    setPlayingState({ action });
  }

  const handleVolumeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handleVidInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongVid(e.target.value);
  };

  const handlePlayIndexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(e.target.value)) return;
    setPlayIndex(Number(e.target.value));
  };

  const handleDurationRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const movedDurationValue = Number(e.target.value)
    // NOTE : seekTo 메서드로 직접 재생 위치를 옮겨야 원활한 동작이 가능
    if (playerInstance && !Number.isNaN(movedDurationValue))
      playerInstance.seekTo(movedDurationValue, true);
      setCurrentDuration(movedDurationValue);
  };

  const addNewSongVidInput = () => {
    const newSongUrl = `https://www.youtube.com/watch?v=${songVid}`;
    const isValidUrl = ReactPlayer.canPlay(newSongUrl);

    if (isValidUrl) {
      setPlayList({ action: 'add', songVid });
      setSongVid('');
    }
  };

  const applyPlayIndex = () => {
    setCurrentPlayIndex(playIndex);
    setCurrentDuration(0);
  };

  return (
    <>
      <YoutubePlayer />
      <div className="flex flex-col">
        <div>
          <button onClick={() => handlePlay('start')}>click to play</button>
          <button onClick={() => handlePlay('stop')}>click to stop</button>
        </div>
        <div className="flex flex-col">
          <h5>Change Volume</h5>
          <input
            type="range"
            max={1}
            min={0}
            step={0.01}
            value={volume}
            onChange={handleVolumeRange}
            disabled={!isPlayerEnabled}
          />
        </div>
        <div className="flex flex-col">
          <input value={songVid} onChange={handleVidInput} />
          <button onClick={addNewSongVidInput}>Add Song Vid</button>
        </div>
        <div className="flex flex-col">
          <h5>Change Seek Range</h5>
          <input
            type="range"
            max={playerInstance?.getDuration() || 0}
            min={0}
            step={1}
            value={currentDuration}
            onChange={handleDurationRange}
            disabled={!isPlayerEnabled}
          />
        </div>
        {playList.length > 0 && (
          <div className="flex flex-col">
            <h5>Current Playlist</h5>
            {playList.map((songVid) => (
              <p key={songVid}>{songVid}</p>
            ))}
            <h5>Current Playing Vid</h5>

            <p>
              {playList[currentPlayIndex]}
              {`(${currentPlayIndex} 번)`}
            </p>
            {playList.length > 1 && (
              <>
                <h5>Change Play Index</h5>
                <input value={playIndex} onChange={handlePlayIndexInput} />
                <button onClick={applyPlayIndex}>Change Play Song</button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default YoutubePlayerController;
