import { useRef, useState } from 'react';

import clsx from 'clsx';

import * as styles from './IntroSection.module.css';

const EMOJI_LIST = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'];

const SelectEmojiSection = () => {
  const textBoxRef = useRef<HTMLDivElement | null>(null);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>(['🎹']);

  return (
    <>
      <div className="flex flex-col gap-4 p-2.5 items-center w-100 my-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center text-white">
          <h3>지금 내게 필요한 이모지는?</h3>
          <p className="text-body3">
            내 기분에 맞는 이모지 최대 3가지를 선택해주세요.
          </p>
        </div>
        <div className="flex gap-2 p-2.5 my-auto bg-gray-900 border-gray-800 rounded-[100px]">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className={clsx(
                !selectedEmojis[index] && 'bg-gray-800',
                'w-6 h-6 rounded-full text-center',
              )}
            >
              {selectedEmojis[index] ?? ''}
            </div>
          ))}
        </div>
      </div>
      <div className="py-1.5 mx-4 grid grid-cols-3 gap-x-2 gap-y-2.5">
        {EMOJI_LIST.map((emoji) => (
          <div key={emoji} className="max-w-full aspect-square p-[30px] text-[40px] rounded-full bg-gray-800">
            {emoji}
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectEmojiSection;
