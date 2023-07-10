'use client';

import PlayingPageHeader from './components/page-header';
import PlayController from './components/play-controller';
import VinylRecord from './components/vinyl-record';
import EmojiVoteList from './components/emoji-list';
import EmojiVoteNotice from './components/vote-notice';

const PlayingPage = () => {
  return (
    <>
      <PlayingPageHeader songTitle="Hype Boy" singerName="NewJeans" />
      <div className='flex flex-col my-auto'>
        <VinylRecord />
        <PlayController />
        <EmojiVoteList />
      </div>
      <EmojiVoteNotice />
    </>
  );
};

export default PlayingPage;
