'use client';

import { useRef } from 'react';

import clsx from 'clsx';

import LongButton from '@/components/button/LongButton';
import Header from '@/components/header/Header';
import { Playlist, PlaylistButton, usePlaylist } from '@/components/playlist';

import * as styles from './Onboarding.module.css';

const ONBOARDING_CONTENT = [
  [
    { type: 'text', content: '말하지 않아도', color: 'text-yellow-300' },
    { type: 'emoji', content: '🤟' },
    { type: 'text', content: '딱보면 아니까!', color: 'text-yellow-300' },
  ],
  [
    {
      type: 'text',
      content: '이모지로 음악을 표현하다',
      color: 'text-sky-200',
    },
    { type: 'emoji', content: '💖' },
  ],
  [
    { type: 'text', content: '이모힙합', color: 'text-sky-200' },
    { type: 'emoji', content: '🥳' },
    { type: 'text', content: '새로운 플리', color: 'text-white' },
    { type: 'emoji', content: '🎵' },
  ],
  [
    { type: 'emoji', content: '🎹' },
    {
      type: 'text',
      content: '백마디 말보다 한개의 이모지',
      color: 'text-yellow-300',
    },
  ],
  [
    { type: 'text', content: '설명하지 않아도', color: 'text-pink-500' },
    { type: 'emoji', content: '😎' },
    { type: 'text', content: '보면 알잖아', color: 'text-white' },
  ],
];

const OnBoardingPage = () => {
  const { isOpenPlaylist } = usePlaylist();
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  const textBoxStyle = ({
      '--left-side': `-${textBoxRef.current?.offsetWidth}px`,
      '--right-side': `${textBoxRef.current?.offsetWidth}px`,
  }) as React.CSSProperties;

  return (
    <>
      <Header
        headerLeft={<h5 className="text-white text-h2">MZ2MO</h5>}
        headerRight={<PlaylistButton className="mb-auto" />}
      />
      <div
        ref={textBoxRef}
        className="flex flex-col w-100 mt-8 mb-auto my-auto border-t border-t-white/30 overflow-hidden"
      >
        {ONBOARDING_CONTENT.map((rowContents, index) => (
          <div key={`row-${index}`} className="py-4 border-b border-b-white/30">
            <div
              style={textBoxStyle}
              className={clsx(styles.scrollText, 'flex items-center gap-4')}
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
      <div className="p-4">
        <LongButton hasArrow>
          <p className="text-subtitle1">체험해보기</p>
        </LongButton>
      </div>
      {isOpenPlaylist ? <Playlist /> : null}
    </>
  );
};

export default OnBoardingPage;
