'use client';

import React, { useState } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import CloseIcon from '@/assets/icons/close.svg';
import AppPortal from '@/components/app-portal';
import EmojiButton from '@/components/button/EmojiButton';
import { TEMP_EMOJI } from '@/emoji';
import FormatUtil from '@/utils/format';

interface EmojiPickerProps {
  onClose: () => void;
  className?: React.ComponentProps<'div'>['className'];
}

const EmojiPicker = ({ onClose, className }: EmojiPickerProps) => {
  const [iconId, setIconId] = useState<string | null>(); // FIXME: 투표한 이모지의 id로 설정, 없다면 null

  const handleIconButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // TODO: api 호출 및 투표 결과 모달
    !!e.currentTarget?.id && setIconId(e.currentTarget?.id);
    // @ fixme: 현재 재생중인 음악 제목으로 변경
    localStorage.setItem('hype boy', e.currentTarget.value);
  };

  return (
    <AppPortal.Wrapper portalName="emoji-picker-portal">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={clsx(
          className,
          'break-keep max-w-[480px] w-full px-4 py-6 bg-gray-900 rounded-t-lg',
        )}
      >
        <div className="flex flex-col items-center justify-between gap-1">
          <div className="relative flex justify-center w-full">
            <h2 className="text-subtitle1">이모지 투표</h2>
            <button onClick={onClose} className="absolute right-0">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <span className="text-caption">
            이 음악에 어울리는 이모지에 투표하세요!
          </span>
        </div>
        <div className="grid grid-cols-6 max-h-[200px] overflow-auto gap-1 mt-4">
          {TEMP_EMOJI.map((emoji) => (
            <EmojiButton
              onClick={handleIconButton}
              isClicked={iconId === emoji.id}
              key={emoji.id}
              id={emoji.id}
              value={emoji.unicode}
              type="button"
            >
              {FormatUtil.formatUnicodeToEmoji(emoji.unicode)}
            </EmojiButton>
          ))}
        </div>
      </motion.div>
    </AppPortal.Wrapper>
  );
};

export default EmojiPicker;
