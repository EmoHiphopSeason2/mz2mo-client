'use client';

import { useState } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import ReactPlayer from 'react-player/youtube';

import {
  controlCurrentPlayingAtom,
  controlPlayingStateAtom,
  controlPlaylistAtom,
  controlVolumeAtom,
} from '@/stores/youtube-controller';

import YoutubePlayer from './YoutubePlayer';

const YoutubePlayerWrapper = () => {
  const [songVid, setSongVid] = useState('');
  const [playIndex, setPlayIndex] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  const setPlayingState = useSetAtom(controlPlayingStateAtom);
  const [playList, setPlayList] = useAtom(controlPlaylistAtom);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useAtom(
    controlCurrentPlayingAtom,
  );
  const [volume, setVolume] = useAtom(controlVolumeAtom);

  const clickPlay = () => {
    setPlayingState({ action: 'start' });
  };

  const stopPlay = () => {
    setPlayingState({ action: 'stop' });
  };

  const handleVolumeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume({ volume: Number(e.target.value) });
  };

  const handleVidInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongVid(e.target.value);
  };

  const handlePlayIndexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(e.target.value)) return;
    setPlayIndex(Number(e.target.value));
  };

  const handleDurationRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDuration(Number(e.target.value));
  };

  const addNewSongVidInput = () => {
    const newSongUrl = `https://www.youtube.com/watch?v=${songVid}`;
    const isValidUrl = ReactPlayer.canPlay(newSongUrl);

    if (isValidUrl) {
      setPlayList({ action: 'add', songVid });
      setSongVid('');
    }
  };

  const applyPlayingIndex = () => {
    if (playIndex < 0 || playIndex >= playList.length) return;
    setCurrentPlayingIndex({ index: playIndex });
  };

  return (
    <>
      <YoutubePlayer />
      <div className="flex flex-col">
        <div>
          <button onClick={clickPlay}>click to play</button>
          <button onClick={stopPlay}>click to stop</button>
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
            max={1}
            min={0}
            step={0.01}
            value={currentDuration}
            onChange={handleDurationRange}
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
              {playList[currentPlayingIndex]}
              {`(${currentPlayingIndex} 번)`}
            </p>
            {playList.length > 1 && (
              <>
                <h5>Change Play Index</h5>
                <input value={playIndex} onChange={handlePlayIndexInput} />
                <button onClick={applyPlayingIndex}>Change Play Song</button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default YoutubePlayerWrapper;
