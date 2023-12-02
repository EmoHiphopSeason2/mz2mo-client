'use client';

import type { WheelEvent } from 'react';
import { useContext, useRef, useState } from 'react';

import clsx from 'clsx';
import { PanInfo, motion } from 'framer-motion';

import {
  OnboardingContextAction,
  OnboardingContextValue,
} from '@/domains/onboarding/OnboardingContext';
import { useThrottle } from '@/hooks/useThrottle';
import { useToast } from '@/hooks/useToast';

const EMOJI_LIST = [
  '⌚️',
  '📱',
  '📲',
  '💻',
  '⌨️',
  '🖥',
  '🖨',
  '🖱',
  '🖲',
  '🕹',
  '🗜',
  '💽',
  '💾',
  '💿',
  '📀',
  '📼',
  '📷',
  '📸',
  '📹',
  '🎥',
  '📽',
  '🎞',
  '📞',
  '☎️',
  '📟',
  '📠',
  '📺',
  '📻',
  '🎙',
  '🎚',
  '🎛',
  '🧭',
  '⏱',
  '⏲',
  '⏰',
  '🕰',
  '⌛️',
  '⏳',
  '📡',
  '🔋',
  '🪫',
  '🔌',
  '💡',
  '🔦',
  '🕯',
];

const SelectEmojiSection = () => {
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const { throttle } = useThrottle();

  /**
   * 이모지 리스트 애니메이션, 보여줄 목록과 관련된 상수와 State 정의
   */
  const [currentEmojiPage, setCurrentEmojiPage] = useState(0);
  const MAX_PAGE = Math.floor(EMOJI_LIST.length / 9);
  const EMOJI_SECTION_HEIGHT = selectBoxRef.current?.offsetHeight ?? 0;

  /**
   * 이모지 선택과 관련한 state 및 setState 함수 정의
   */
  const { selectedEmojis } = useContext(OnboardingContextValue);
  const { setSelectedEmojis } = useContext(OnboardingContextAction);

  const handleClickEmoji = (clickedEmoji: string) => {
    if (selectedEmojis.includes(clickedEmoji)) {
      setSelectedEmojis(
        [...selectedEmojis].filter((emoji) => emoji !== clickedEmoji),
      );
      return;
    }

    selectedEmojis.length < 3
      ? setSelectedEmojis([...selectedEmojis, clickedEmoji])
      : toast.error({
          title: '이모지를 선택할 수 없어요!',
          message: '이모지는 총 3개까지만 선택할 수 있습니다.',
        });
  };

  /**
   * WheelEvent, PointerEvent 발동 시 작동할 이벤트 핸들러 목록
   */
  const handleWheelEmojiSection = (event: WheelEvent<HTMLDivElement>) => {
    const deltaY = event.nativeEvent.deltaY;

    const nextPage = deltaY < 0 ? -1 : 1;
    const updatedEmojiPage = currentEmojiPage + nextPage;

    if (updatedEmojiPage < 0 || updatedEmojiPage >= MAX_PAGE) return;
    setCurrentEmojiPage(updatedEmojiPage);
  };

  const handlePanEmojiSection = (event: PointerEvent, info: PanInfo) => {
    event.stopPropagation();
    const nextPage = info.delta.y < 0 ? 1 : -1;
    const updatedEmojiPage = currentEmojiPage + nextPage;

    if (updatedEmojiPage < 0 || updatedEmojiPage >= MAX_PAGE) return;
    setCurrentEmojiPage(updatedEmojiPage);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-2.5 items-center w-100 my-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center text-white">
          <h3>지금 내게 필요한 이모지는?</h3>
          <p className="text-body3">
            내 기분에 맞는 이모지 최대 3가지를 선택해주세요.
          </p>
        </div>
        <div className="flex gap-2 p-2.5 my-auto bg-gray-900 border border-gray-800 rounded-[100px]">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className={clsx(
                !selectedEmojis[index] && 'bg-gray-800',
                'w-6 h-6 rounded-full text-center',
              )}
              onClick={() => handleClickEmoji(selectedEmojis[index] ?? '')}
            >
              {selectedEmojis[index] ?? ''}
            </div>
          ))}
        </div>
      </div>
      <div
        ref={selectBoxRef}
        className="my-1.5 mx-4 overflow-hidden aspect-square"
      >
        <motion.div
          animate={{
            transform: `translateY(${
              -currentEmojiPage * (EMOJI_SECTION_HEIGHT + 8)
            }px`,
          }}
          transition={{
            ease: 'easeInOut',
            type: 'spring',
            duration: 0.33,
          }}
          className="grid grid-cols-3 gap-x-2 gap-y-2 scroll-smooth touch-none"
          onWheel={throttle(handleWheelEmojiSection, 200)}
          onPanStart={handlePanEmojiSection}
        >
          {EMOJI_LIST.map((emoji) => (
            <svg
              key={emoji}
              className="max-w-full aspect-square rounded-full"
              viewBox="0 0 360 360"
              onClick={() => handleClickEmoji(emoji)}
            >
              <defs>
                <linearGradient id="mz02" gradientTransform="rotate(135)">
                  <stop offset="0%" stopColor="#1853FF" />
                  <stop offset="100%" stopColor="#18FF59" />
                </linearGradient>
              </defs>
              <circle
                className={clsx(
                  selectedEmojis.includes(emoji)
                    ? 'fill-gray-900'
                    : 'fill-transparent',
                  'mr-auto hover:fill-gray-900',
                )}
                stroke={
                  selectedEmojis.includes(emoji) ? 'url(#mz02)' : 'bg-gray-800'
                }
                cx="50%"
                cy="50%"
                r="50%"
                strokeWidth="8"
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="530%"
              >
                {emoji}
              </text>
            </svg>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SelectEmojiSection;
