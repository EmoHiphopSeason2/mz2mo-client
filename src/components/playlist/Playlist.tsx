'use client';

import { useState } from 'react';

import { Reorder } from 'framer-motion';

import CloseIcon from '@/assets/icons/close.svg';
import AppPortal from '@/components/app-portal';
import BottomMusicPlayer from '@/components/bottom-player';
import { Header } from '@/components/header';
import PlaylistItem from '@/components/playlist/PlaylistItem';
import { usePlaylist } from '@/components/playlist/hooks/usePlaylist';

// FIX: 현재 임시 데이터로 해놓은 상태. 추후 변경 필요
const PLAYLIST = [
  {
    id: 1,
    url: 'https://via.placeholder.com/50',
    title: 'Hype Boys',
    artist: 'NewJeans',
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/50',
    title: '예뻤어 (여름날 우리 X 김민석 (멜로망스))',
    artist: '김민석 (멜로망스) 예뻤어 (여름날 우리 X 김민석 (멜로망스))2023',
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/50',
    title: 'Super Shy',
    artist: 'NewJeans',
  },
  {
    id: 4,
    url: 'https://via.placeholder.com/50',
    title: 'Cool With You',
    artist: 'NewJeans',
  },
  {
    id: 5,
    url: 'https://via.placeholder.com/50',
    title: 'Hype Boys',
    artist: 'NewJeans',
  },
  {
    id: 6,
    url: 'https://via.placeholder.com/50',
    title: '예뻤어 (여름날 우리 X 김민석 (멜로망스))',
    artist: '김민석 (멜로망스) 예뻤어 (여름날 우리 X 김민석 (멜로망스))2023',
  },
  {
    id: 7,
    url: 'https://via.placeholder.com/50',
    title: 'Super Shy',
    artist: 'NewJeans',
  },
  {
    id: 8,
    url: 'https://via.placeholder.com/50',
    title: 'Cool With You',
    artist: 'NewJeans',
  },
];

const Playlist = () => {
  const [playlist, setPlaylist] = useState(PLAYLIST);
  const { closePlaylist } = usePlaylist();

  return (
    <AppPortal.Wrapper portalName="modal-portal">
      <div className="flex flex-col h-full min-h-screen bg-black">
        <Header
          headerLeft={<h1>Play List</h1>}
          headerRight={
            <button type="button" onClick={closePlaylist}>
              <CloseIcon className="h-[24px] w-[24px] text-white" />
            </button>
          }
        />
        <Reorder.Group
          values={playlist}
          onReorder={setPlaylist}
          axis="y"
          className="flex flex-col gap-2 overflow-auto"
        >
          {playlist.map((item) => (
            <PlaylistItem key={item.id} item={item} />
          ))}
        </Reorder.Group>
      </div>
      <BottomMusicPlayer />
    </AppPortal.Wrapper>
  );
};

export default Playlist;
