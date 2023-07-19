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
import { useToast } from '@/hooks/useToast';
import { controlOpenEmojiPickerAtom } from '@/stores/emoji-picker';

const YoutubePlayer = dynamic(
  () => import('@/components/youtube-player/YoutubePlayer'),
  {
    ssr: false,
  },
);

const PlayingPage = () => {
  const { toast } = useToast();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useAtom(
    controlOpenEmojiPickerAtom,
  );

  const handleOpenEmojiPickerButton = () => {
    setIsEmojiPickerOpen(true);
  };

  // NOTE: 임시 토스트 테스트용
  const toastTest = () => {
    toast.success({ title: 'temp title', message: 'temp message' });
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
        <div className="fixed bottom-0 justify-between items-center flex gap-2 p-4 max-w-[440px] -translate-x-1/2 bg-gray-900 rounded-t-lg left-1/2">
          <div className="flex flex-col whitespace-nowrap">
            <h4 className="text-white text-subtitle1">
              이 음악에 어울리는 이모지는?
            </h4>
            <p className="text-white text-caption">
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
