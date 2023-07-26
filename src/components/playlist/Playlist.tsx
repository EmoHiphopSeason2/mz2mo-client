'use client';

import Image from 'next/image';
import React from 'react';

import Close from '@/assets/icons/close.svg';
import Menu from '@/assets/icons/menu.svg';
import AppPortal from '@/components/app-portal';
import BottomMusicPlayer from '@/components/bottom-player';
import Header from '@/components/header/Header';
import { usePlaylist } from '@/components/playlist/usePlaylist';

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
  const { closePlaylist } = usePlaylist();
  return (
    <>
      <AppPortal.Wrapper portalName="modal-portal">
        <div className="flex flex-col h-screen bg-black">
          <Header
            headerLeft={<h1>Play List</h1>}
            headerRight={
              <button type="button" onClick={closePlaylist}>
                <Close className="h-[24px] w-[24px] text-white" />
              </button>
            }
          />
          <ul className="overflow-auto">
            {PLAYLIST.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-[24px] px-5 py-4 hover:bg-gray-900"
              >
                <Image
                  className="rounded-full"
                  src={item.url}
                  alt={item.title}
                  width="50"
                  height="50"
                />
                <div className="flex flex-col flex-1 mr-auto overflow-hidden whitespace-nowrap">
                  <span className="overflow-hidden text-ellipsis text-subtitle1">
                    {item.title}
                  </span>
                  <span className="overflow-hidden text-ellipsis text-body3">
                    {item.artist}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Close className="h-[20px] w-[20px] cursor-pointer text-gray-700 hover:text-white" />
                  <Menu className="h-[20px] w-[20px] cursor-pointer text-gray-700 hover:text-white" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AppPortal.Wrapper>
      <AppPortal.Wrapper portalName="modal-portal">
        <BottomMusicPlayer />
      </AppPortal.Wrapper>
    </>
  );
};

export default Playlist;
