import { memo, useCallback } from 'react';

import { useAtom } from 'jotai';

import ControlNextIcon from '@/assets/icons/controlNext.svg';
import ControlPauseIcon from '@/assets/icons/controlPause.svg';
import ControlPlayIcon from '@/assets/icons/controlPlay.svg';
import ControlPrevIcon from '@/assets/icons/controlPrev.svg';
import PlayListIcon from '@/assets/icons/playlist.svg';
import YoutubePlayer from '@/components/youtube-player/YoutubePlayer';
import {
  controlCurrentPlayingAtom,
  controlPlayingStateAtom,
} from '@/stores/youtube-controller';

const BottomMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useAtom(controlPlayingStateAtom);
  const [currentIndex, setCurrentIndex] = useAtom(controlCurrentPlayingAtom);

  const PlayingIcon = isPlaying ? ControlPauseIcon : ControlPlayIcon;

  const togglePlayingState = useCallback(() => {
    setIsPlaying({ action: isPlaying ? 'stop' : 'start' });
  }, [isPlaying]);

  const selectPlaylist = {
    prevSong: () => setCurrentIndex(currentIndex - 1),
    nextSong: () => setCurrentIndex(currentIndex + 1),
  };

  return (
    <>
      <section className="w-[480px] bg-gray-900 mx-auto py-4 px-5 flex gap-[17px] items-center">
        <div className="flex flex-col mr-auto">
          <h4 className="text-h4 text-white">Hype Boy</h4>
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
      </section>
      <YoutubePlayer />
    </>
  );
};

export default BottomMusicPlayer;
