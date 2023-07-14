'use client';

import dynamic from 'next/dynamic';

import { useAtom, useSetAtom } from 'jotai';

import EmojiPicker from '@/components/EmojiPicker';
import BasicButton from '@/components/button/BasicButton';
import Header from '@/components/header/Header';
import MenuButton from '@/components/header/MenuButton';
import PreviousButton from '@/components/header/PreviousButton';
import EmojiVoteList from '@/domains/playing/emoji-list';
import PlayController from '@/domains/playing/play-controller';
import VinylRecordList from '@/domains/playing/vinyl-record';
import { controlOpenEmojiPickerAtom } from '@/stores/emoji-picker';
import { useToastAtom } from '@/stores/toast';

const YoutubePlayer = dynamic(
  () => import('@/components/youtube-player/YoutubePlayer'),
  {
    ssr: false,
  },
);

const PlayingPage = () => {
  const addToast = useSetAtom(useToastAtom);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useAtom(
    controlOpenEmojiPickerAtom,
  );

  const handleOpenEmojiPickerButton = () => {
    setIsEmojiPickerOpen(true);
  };

  // NOTE: 임시 토스트 테스트용
  const toastTest = () => {
    addToast('success')('title', 'message');
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
        headerRight={<MenuButton onClick={() => {}} className="mb-auto" />}
      />
      <div className="flex flex-col py-2 my-auto">
        <VinylRecordList />
        <PlayController />
        <EmojiVoteList />
      </div>
      {isEmojiPickerOpen ? (
        <EmojiPicker className="fixed bottom-0 -translate-x-1/2 left-1/2" />
      ) : (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 min-w-[320px] max-w-[440px] bg-gray-900 rounded-t-lg px-4 py-[22px] flex gap-1 justify-between">
          <div className="flex flex-col overflow-hidden">
            <h4 className="overflow-hidden text-white text-h4 whitespace-nowrap text-ellipsis">
              이 음악에 어울리는 이모지는?
            </h4>
            <p className="overflow-hidden text-white text-body3 whitespace-nowrap text-ellipsis">
              지금 듣고있는 음악을 표현할 이모지에 투표하세요!
            </p>
          </div>
          <BasicButton
            onClick={handleOpenEmojiPickerButton}
            size="sm"
            className="max-h-12"
          >
            <p className="text-body3 whitespace-nowrap">투표하기</p>
          </BasicButton>
        </div>
      )}
      <YoutubePlayer />
    </>
  );
};

export default PlayingPage;
