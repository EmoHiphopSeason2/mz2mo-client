'use client';

import React, { useState } from 'react';

import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';

import CloseIcon from '@/assets/icons/close.svg';
import AppPortal from '@/components/app-portal';
import EmojiButton from '@/components/button/EmojiButton';
import {
  controlEmojiPickerCurrentSongAtom,
  controlOpenEmojiPickerAtom,
} from '@/stores/emoji-picker/actions';

// FIX: 서버로부터 emoji 불러오기
const emojis = [
  { id: 'rabbit', icon: '🐰' },
  { id: 'lovely', icon: '🥰' },
  { id: 'cupid', icon: '💘' },
  { id: 'sleepy', icon: '😴' },
  { id: 'curious', icon: '🤔' },
  { id: 'sad', icon: '🥲' },
];

interface EmojiPickerProps {
  className?: React.ComponentProps<'div'>['className'];
}

const EmojiPicker = ({ className }: EmojiPickerProps) => {
  const [iconId, setIconId] = useState<string | null>(); // FIXME: 투표한 이모지의 id로 설정, 없다면 null
  const setIsOpen = useSetAtom(controlOpenEmojiPickerAtom);
  const currentSong = useAtomValue(controlEmojiPickerCurrentSongAtom);

  const handleIconButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // TODO: api 호출 및 투표 결과 모달
    !!e.currentTarget?.id && setIconId(e.currentTarget?.id);
  };

  const handleCloseButton = () => {
    setIsOpen(false);
  };

  return (
    <AppPortal.Wrapper portalName="emoji-picker-portal">
      <div
        className={clsx(
          className,
          'break-keep max-w-m px-4 py-4 bg-gray-900 rounded-t-lg',
        )}
      >
        <div className="flex items-start justify-between gap-2 pb-4 border-b border-b-gray-500">
          <div className="flex flex-col">
            <span className="text-subtitle1">
              {currentSong} 음악에 어울리는 이모지는?
            </span>
            <span className="text-caption">
              아래 이모지 중 노래를 대표할 이모지 1개를 선택하세요!
            </span>
          </div>
          <button onClick={handleCloseButton}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center justify-center w-full gap-2 pt-5 text-2xl">
          {emojis.map((emoji) => (
            <EmojiButton
              onClick={handleIconButton}
              isClicked={iconId === emoji.id}
              key={emoji.id}
              id={emoji.id}
              type="button"
            >
              {emoji.icon}
            </EmojiButton>
          ))}
        </div>
      </div>
    </AppPortal.Wrapper>
  );
};

export default EmojiPicker;
