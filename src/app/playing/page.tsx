'use client';

import dynamic from 'next/dynamic';

import SearchIcon from '@/assets/icons/search.svg';
import VoteIcon from '@/assets/icons/vote.svg';
import EmojiPicker from '@/components/EmojiPicker';
import Header from '@/components/header/Header';
import PreviousButton from '@/components/header/PreviousButton';
import { Playlist, PlaylistButton, usePlaylist } from '@/components/playlist';
import PlayController from '@/domains/playing/play-controller';
import VinylRecordList from '@/domains/playing/vinyl-record';
import useDisclosure from '@/hooks/useDisclosure';
import FormatUtil from '@/utils/format';

const YoutubePlayer = dynamic(
  () => import('@/components/youtube-player/YoutubePlayer'),
  {
    ssr: false,
  },
);

// @note: 임시 데이터
const EMOJI_LIST = [
  {
    id: 'emoji-1',
    unicode: 'U+1F601',
    count: 434,
  },
  {
    id: 'emoji-2',
    unicode: 'U+1F602',
    count: 212,
  },
  {
    id: 'emoji-3',
    unicode: 'U+1F60D',
    count: 123,
  },
  {
    id: 'emoji-4',
    unicode: 'U+1F621',
    count: 12,
  },
  {
    id: 'emoji-5',
    unicode: 'U+1F62D',
    count: 1,
  },
];

const PlayingPage = () => {
  const { isOpenPlaylist } = usePlaylist();
  const emojiPickerDisclosure = useDisclosure();

  const PlaylistComponent = isOpenPlaylist ? <Playlist /> : null;
  const isVoted = localStorage.getItem('hype boy'); // @fixme: 음악 제목으로 변경

  // @note: local storage에 해당 음악에 대한 투표 기록이 있는지 확인
  const emojiList = isVoted
    ? EMOJI_LIST
    : Array.from({ length: 5 }).map((_, index) => {
        return {
          id: index,
          unicode: 'U+1F914',
          count: null,
        };
      });

  const handleEmojiButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log(e.target);
  };

  return (
    <>
      <Header
        headerLeft={<PreviousButton onClick={() => {}} className="mb-auto" />}
        headerCenter={
          <div className="flex-col text-center w-100">
            <h5 className="text-white text-h2">Hype boy</h5>
            <p className="text-white text-body3">NewJeans</p>
          </div>
        }
        headerRight={<PlaylistButton className="mb-auto" />}
      />
      <div className="flex flex-col py-2 my-auto">
        <VinylRecordList />
        <PlayController />
        <div className="flex flex-col items-center p-4 m-4 bg-gray-900 border border-gray-800 rounded-lg">
          <h2 className="text-subtitle1">Hype boy</h2>
          <p className="mt-1">음악에 어울리는 이모지에 투표하세요!</p>
          <ol className="flex gap-1 mt-2">
            {emojiList.map((emoji) => (
              <li
                key={emoji.id}
                className="flex flex-col items-center justify-center p-2.5 bg-gray-800 rounded"
              >
                <span className="text-xl">
                  {FormatUtil.formatUnicodeToEmoji(emoji.unicode)}
                </span>
                <span className="text-caption w-[23px] text-center">
                  {emoji.count ?? '?'}
                </span>
              </li>
            ))}
            <button
              onClick={emojiPickerDisclosure.open}
              className="flex flex-col items-center justify-center p-2.5 bg-gray-600 rounded cursor-pointer text-caption"
            >
              {isVoted ? <SearchIcon /> : <VoteIcon />}
              {isVoted ? '' : '투표'}
            </button>
          </ol>
        </div>
      </div>
      {emojiPickerDisclosure.isOpen && (
        <EmojiPicker
          className="fixed bottom-0"
          onClose={emojiPickerDisclosure.close}
        />
      )}
      {PlaylistComponent}
      <YoutubePlayer />
    </>
  );
};

export default PlayingPage;
