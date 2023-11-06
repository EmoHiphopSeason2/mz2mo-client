import { useRef } from 'react';

import clsx from 'clsx';

import LongButton from '@/components/button/LongButton';

import * as styles from './IntroSection.module.css';

const INTRO_CONTENTS = [
  [
    { type: 'text', content: '말하지 않아도', color: 'text-yellow-300' },
    { type: 'emoji', content: '🤟' },
    { type: 'text', content: '딱보면 아니까!', color: 'text-yellow-300' },
    { type: 'emoji', content: '🎹' },
    {
      type: 'text',
      content: '백마디 말보다 한개의 이모지',
      color: 'text-yellow-300',
    },
  ],
  [
    {
      type: 'text',
      content: '이모지로 음악을 표현하다',
      color: 'text-sky-200',
    },
    { type: 'emoji', content: '💖' },
    { type: 'text', content: '설명하지 않아도', color: 'text-pink-500' },
    { type: 'emoji', content: '😎' },
    { type: 'text', content: '보면 알잖아', color: 'text-white' },
  ],
  [
    { type: 'text', content: '이모힙합', color: 'text-sky-200' },
    { type: 'emoji', content: '🥳' },
    { type: 'text', content: '새로운 플리', color: 'text-white' },
    { type: 'emoji', content: '🎵' },
    { type: 'text', content: '말하지 않아도', color: 'text-yellow-300' },
    { type: 'emoji', content: '🤟' },
    { type: 'text', content: '딱보면 아니까!', color: 'text-yellow-300' },
  ],
  [
    {
      type: 'text',
      content: '백마디 말보다 한개의 이모지',
      color: 'text-yellow-300',
    },
    { type: 'emoji', content: '🎹' },
    {
      type: 'text',
      content: '이모지로 음악을 표현하다',
      color: 'text-sky-200',
    },
  ],
  [
    { type: 'text', content: '설명하지 않아도', color: 'text-pink-500' },
    { type: 'emoji', content: '😎' },
    { type: 'text', content: '보면 알잖아', color: 'text-white' },
    { type: 'text', content: '이모힙합', color: 'text-sky-200' },
    { type: 'emoji', content: '🥳' },
    { type: 'text', content: '새로운 플리', color: 'text-white' },
  ],
];

const IntroSection = () => {
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={textBoxRef}
      className="flex flex-col w-100 my-auto border-t border-t-white/30 overflow-hidden"
    >
      {INTRO_CONTENTS.map((rowContents, index) => (
        <div
          key={`row-${index}`}
          className="flex py-4 border-b border-b-white/30"
        >
          <div
            className={clsx(
              index % 2
                ? styles.scrollFromLeft
                : styles.scrollFromRight_duplicated,
              'flex items-center px-2 gap-4 whitespace-nowrap',
            )}
          >
            {rowContents.map(({ type, content, color }) => (
              <p
                key={content}
                className={clsx(
                  type === 'text' ? 'text-h1' : 'text-[50px]',
                  color,
                )}
              >
                {content}
              </p>
            ))}
          </div>
          <div
            className={clsx(
              index % 2
                ? styles.scrollFromLeft_duplicated
                : styles.scrollFromRight,
              'flex items-center px-2 gap-4 whitespace-nowrap',
            )}
          >
            {rowContents.map(({ type, content, color }) => (
              <p
                key={content}
                className={clsx(
                  type === 'text' ? 'text-h1' : 'text-[50px]',
                  color,
                )}
              >
                {content}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntroSection;
