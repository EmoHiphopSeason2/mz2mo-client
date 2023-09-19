'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import BottomMusicPlayer from '@/components/bottom-player';
import { Header } from '@/components/header';
import { Playlist, PlaylistButton, usePlaylist } from '@/components/playlist';

const MOST_VOTED_SONGS = [
  {
    id: 'MOST_VOTED_SONGS_1',
    url: 'https://via.placeholder.com/140',
    title: 'Hype Boys',
    artist: 'NewJeans',
  },
  {
    id: 'MOST_VOTED_SONGS_2',
    url: 'https://via.placeholder.com/70',
    title: '예뻤어 (여름날 우리 X 김민석 (멜로망스))',
    artist: '김민석 (멜로망스) 예뻤어 (여름날 우리 X 김민석 (멜로망스))2023',
  },
  {
    id: 'MOST_VOTED_SONGS_3',
    url: 'https://via.placeholder.com/70',
    title: 'Super Shy',
    artist: 'NewJeans',
  },
];

export default function Home() {
  const { isOpenPlaylist } = usePlaylist();

  if (isOpenPlaylist) return <Playlist />;

  return (
    <div className="h-full bg-black">
      <Header
        headerLeft="logo"
        headerRight={<PlaylistButton className="mb-auto" />}
      />
      <div className="px-4 pt-8 pb-28">
        <section className="flex flex-col gap-4 mb-10">
          <h2 className="text-subtitle1">투표수 많은 노래</h2>
          <ol>
            {MOST_VOTED_SONGS.map((item, index) => (
              <li
                className={clsx(
                  'flex gap-4 bg-gray-900 border border-gray-800 rounded-lg g-4 p-4 relative',
                  index === 0 ? 'mt-0' : 'mt-2',
                )}
                key={item.id}
              >
                <Image
                  className={clsx(
                    'rounded-[4px]',
                    index === 0 ? 'h-[140px] w-[140px]' : 'h-[70px] w-[70px]',
                  )}
                  src={item.url}
                  alt={item.title}
                  width={index === 0 ? '140' : '70'}
                  height={index === 0 ? '140' : '70'}
                />
                <div className="flex flex-col overflow-hidden whitespace-nowrap">
                  <span className="overflow-hidden text-ellipsis text-body3">
                    {item.title}
                  </span>
                  <span className="overflow-hidden font-normal text-ellipsis text-caption">
                    {item.artist}
                  </span>
                  <ol className="flex gap-2 mt-2">
                    <li>👍</li>
                    <li>❤️</li>
                    <li>✨</li>
                  </ol>
                </div>
                <Link
                  href="/"
                  className="absolute inline-block px-3 py-1 font-normal text-gray-300 border border-gray-300 rounded-full bottom-4 right-4 text-caption"
                >
                  투표하기
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-subtitle1">내가 들었던 노래</h2>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>{index}</div>
          ))}
        </section>
      </div>
      <BottomMusicPlayer />
    </div>
  );
}
