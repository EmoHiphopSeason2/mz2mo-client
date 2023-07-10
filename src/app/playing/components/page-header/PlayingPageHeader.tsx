'use client';

import { PropsWithChildren } from 'react';

import Header from '@/components/header/Header';
import MenuButton from '@/components/header/MenuButton';
import PreviousButton from '@/components/header/PreviousButton';

interface PlayingPageHeaderProps {
  songTitle: string;
  singerName: string;
}

const PlayingPageHeader = ({
  songTitle,
  singerName,
}: PropsWithChildren<PlayingPageHeaderProps>) => (
  <Header
    headerLeft={<PreviousButton onClick={() => {}} className="mb-auto" />}
    headerCenter={
      <div className="flex-col w-100 text-center">
        <h5 className="text-white text-h2">{songTitle}</h5>
        <p className="text-white text-body3">{singerName}</p>
      </div>
    }
    headerRight={<MenuButton onClick={() => {}} className="mb-auto" />}
  />
);

export default PlayingPageHeader;
