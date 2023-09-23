'use client';

import React from 'react';

import BottomMusicPlayer from '@/components/bottom-player';
import { Header } from '@/components/header';
import { PlaylistButton } from '@/components/playlist';
import { MusicComponent } from '@/domains/history';

// @fixme: 임시 데이터
const HISTORY_SONGS = [
  {
    id: 'HISTORY_SONGS_1',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up Make Up Make Up',
    artist: 'Sam Kim',
    emoji: '👍',
  },
  {
    id: 'HISTORY_SONGS_2',
    url: 'https://via.placeholder.com/80',
    title: 'Love Me Like That (Feat. Sik-K, 이영지, Paloalto)',
    artist: 'Sam Kim',
    emoji: '👍',
  },
  {
    id: 'HISTORY_SONGS_3',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '',
  },
  {
    id: 'HISTORY_SONGS_4',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '',
  },
  {
    id: 'HISTORY_SONGS_5',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '🍔',
  },
  {
    id: 'HISTORY_SONGS_6',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '',
  },
  {
    id: 'HISTORY_SONGS_7',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '☁️',
  },
  {
    id: 'HISTORY_SONGS_8',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '🌈',
  },
  {
    id: 'HISTORY_SONGS_9',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '',
  },
  {
    id: 'HISTORY_SONGS_10',
    url: 'https://via.placeholder.com/80',
    title: 'Make Up',
    artist: 'Sam Kim',
    emoji: '',
  },
];

const page = () => {
  return (
    <div className="h-full bg-black">
      <Header
        headerLeft="logo"
        headerRight={<PlaylistButton className="mb-auto" />}
      />
      <div className="py-8">
        <section className="flex flex-col gap-4 px-4">
          <h2 className="text-subtitle1">내가 들었던 노래</h2>
          <ol className="flex flex-col w-full gap-4">
            {HISTORY_SONGS.map((item, index) => (
              <MusicComponent
                key={item.id}
                item={item}
                isLastItem={index === HISTORY_SONGS.length - 1}
                className="w-full"
              />
            ))}
          </ol>
        </section>
      </div>
      <BottomMusicPlayer />
    </div>
  );
};

export default page;
