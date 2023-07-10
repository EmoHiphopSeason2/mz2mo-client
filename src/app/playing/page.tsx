'use client';

import dynamic from 'next/dynamic';

import EmojiVoteList from './components/emoji-list';
import PlayingPageHeader from './components/page-header';
import PlayController from './components/play-controller';
import VinylRecord from './components/vinyl-record';
import EmojiVoteNotice from './components/vote-notice';

const YoutubePlayer = dynamic(
  () => import('@/components/youtube-player/YoutubePlayer'),
  {
    ssr: false,
  },
);

const PlayingPage = () => {
  return (
    <>
      <PlayingPageHeader songTitle="Hype Boy" singerName="NewJeans" />
      <div className="flex flex-col my-auto">
        <VinylRecord />
        <PlayController />
        <EmojiVoteList />
      </div>
      <EmojiVoteNotice />
      <YoutubePlayer />
    </>
  );
};

export default PlayingPage;
