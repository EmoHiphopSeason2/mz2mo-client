'use client';

import dynamic from 'next/dynamic';

import BasicButton from '@/components/button/BasicButton';
import Header from '@/components/header/Header';
import MenuButton from '@/components/header/MenuButton';
import PreviousButton from '@/components/header/PreviousButton';
import EmojiVoteList from '@/domains/playing/emoji-list';
import PlayController from '@/domains/playing/play-controller';
import VinylRecordList from '@/domains/playing/vinyl-record';

const YoutubePlayer = dynamic(
  () => import('@/components/youtube-player/YoutubePlayer'),
  {
    ssr: false,
  },
);

const PlayingPage = () => {
  return (
    <>
      <Header
        headerLeft={<PreviousButton onClick={() => {}} className="mb-auto" />}
        headerCenter={
          <div className="flex-col w-100 text-center">
            <h5 className="text-white text-h2">Hype boy</h5>
            <p className="text-white text-body3">NewJeans</p>
          </div>
        }
        headerRight={<MenuButton onClick={() => {}} className="mb-auto" />}
      />
      <div className='flex flex-col my-auto py-2'>
        <VinylRecordList />
        <PlayController />
        <EmojiVoteList />
      </div>
      <div className="min-w-[320px] max-w-[440px] bg-gray-900 rounded-t-lg px-4 py-[22px] flex gap-1 justify-between mx-5">
        <div className="flex flex-col overflow-hidden">
          <h4 className="text-h4 text-white whitespace-nowrap text-ellipsis overflow-hidden">이 음악에 어울리는 이모지는?</h4>
          <p className="text-body3 text-white whitespace-nowrap text-ellipsis overflow-hidden">
            지금 듣고있는 음악을 표현할 이모지에 투표하세요!
          </p>
        </div>
        <BasicButton size="sm" className='max-h-12'>
          <p className="text-body3 whitespace-nowrap">투표하기</p>
        </BasicButton>
      </div>
      <YoutubePlayer />
    </>
  );
};

export default PlayingPage;
