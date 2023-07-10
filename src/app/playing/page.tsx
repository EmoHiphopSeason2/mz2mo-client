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
      <VinylRecord />
      <PlayController />
      <EmojiVoteList />
      <EmojiVoteNotice />
    </>
  );
};

export default PlayingPage;
